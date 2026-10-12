/* ============================================================================
 * mock-data.js
 * Self-contained fake microbiome dataset for the BiomeInsight viewer mockup.
 * Everything here is generated deterministically (seeded PRNG) so the page
 * looks the same on every reload, with no backend involved.
 *
 * Shapes below intentionally mirror what the real biomeinsights-fargate
 * plumber API returned, so the viewer's existing render logic can be reused
 * almost unchanged:
 *   - MOCK_TAXA[rank]            -> /taxabarplot?rank=
 *   - MOCK_ALPHA                 -> /alphaboxplot?rank=&metrics=  (all rows, pre-filtered client-side)
 *   - MOCK_RAREFACTION           -> /alphadepths
 *   - mockPcoa(rank, distance)   -> /pcoa?rank=&distance=
 *   - mockUpgma(rank, distance)  -> /upgma_taxabarplot?distance=&rank=
 *   - mockPermanovaMeta(rank)    -> /permanova_meta?rank=
 *   - mockPermanova(...)         -> POST /permanova
 *   - mockAlphaStats(...)        -> POST /alphaboxplot/stats (client-side approximation)
 * ============================================================================ */

(function (global) {
  'use strict';

  // ── seeded PRNG (mulberry32) — deterministic across reloads ────────────────
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rng = mulberry32(20260925);
  const rand = () => rng();
  const randn = () => { // Box-Muller
    let u = 0, v = 0;
    while (u === 0) u = rand();
    while (v === 0) v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];

  // ── sample roster + metadata ────────────────────────────────────────────────
  const N_SAMPLES = 22;
  const GROUPS = ['Control', 'Treatment'];
  const TIMEPOINTS = ['Baseline', 'Week 8'];
  const SITES = ['Jakarta', 'Bandung', 'Surabaya'];
  const SEX = ['F', 'M'];

  const SAMPLES = [];
  const METADATA = {};
  const N_SUBJECTS = 11;
  for (let s = 1; s <= N_SUBJECTS; s++) {
    const subjectId = 'SUBJ' + String(s).padStart(2, '0');
    const group = GROUPS[s % 2];
    const site = pick(SITES);
    const sex = pick(SEX);
    const baseAge = 22 + Math.floor(rand() * 40);
    TIMEPOINTS.forEach((tp) => {
      const sid = subjectId + '_' + (tp === 'Baseline' ? 'BL' : 'W8');
      SAMPLES.push(sid);
      METADATA[sid] = {
        group,
        timepoint: tp,
        subject_id: subjectId,
        site,
        sex,
        age: baseAge + (tp === 'Week 8' ? 0 : 0),
        bmi: Number((21 + rand() * 9).toFixed(1)),
      };
    });
  }
  // pad out to N_SAMPLES with a few unpaired extras for realism
  while (SAMPLES.length < N_SAMPLES) {
    const idx = SAMPLES.length + 1;
    const sid = 'EXTRA' + String(idx).padStart(2, '0');
    SAMPLES.push(sid);
    METADATA[sid] = {
      group: pick(GROUPS),
      timepoint: pick(TIMEPOINTS),
      subject_id: 'SUBJ' + String(90 + idx),
      site: pick(SITES),
      sex: pick(SEX),
      age: 22 + Math.floor(rand() * 40),
      bmi: Number((21 + rand() * 9).toFixed(1)),
    };
  }

  // ── taxonomy trees per rank ──────────────────────────────────────────────
  const TAXA_BY_RANK = {
    Kingdom: ['Bacteria', 'Archaea'],
    Phylum: ['Firmicutes', 'Bacteroidetes', 'Proteobacteria', 'Actinobacteria',
      'Verrucomicrobia', 'Fusobacteria', 'Cyanobacteria', 'Tenericutes'],
    Class: ['Clostridia', 'Bacteroidia', 'Gammaproteobacteria', 'Actinobacteria',
      'Verrucomicrobiae', 'Bacilli', 'Negativicutes', 'Fusobacteriia', 'Erysipelotrichia'],
    Order: ['Clostridiales', 'Bacteroidales', 'Enterobacterales', 'Bifidobacteriales',
      'Verrucomicrobiales', 'Lactobacillales', 'Selenomonadales', 'Fusobacteriales',
      'Coriobacteriales', 'Erysipelotrichales'],
    Family: ['Lachnospiraceae', 'Ruminococcaceae', 'Bacteroidaceae', 'Prevotellaceae',
      'Enterobacteriaceae', 'Bifidobacteriaceae', 'Akkermansiaceae', 'Lactobacillaceae',
      'Veillonellaceae', 'Fusobacteriaceae', 'Coriobacteriaceae', 'Erysipelotrichaceae'],
    Genus: ['Faecalibacterium', 'Bacteroides', 'Prevotella', 'Roseburia', 'Blautia',
      'Bifidobacterium', 'Akkermansia', 'Escherichia', 'Lactobacillus', 'Veillonella',
      'Fusobacterium', 'Ruminococcus', 'Alistipes', 'Collinsella', 'Dorea'],
    Species: ['Faecalibacterium prausnitzii', 'Bacteroides fragilis', 'Bacteroides vulgatus',
      'Prevotella copri', 'Roseburia intestinalis', 'Blautia obeum', 'Bifidobacterium longum',
      'Akkermansia muciniphila', 'Escherichia coli', 'Lactobacillus reuteri',
      'Veillonella parvula', 'Fusobacterium nucleatum', 'Ruminococcus bromii',
      'Alistipes putredinis', 'Collinsella aerofaciens', 'Dorea longicatena'],
  };
  TAXA_BY_RANK.taxon_name = TAXA_BY_RANK.Species; // "Last Taxa Identified" mirrors species-level names

  // ── build one relative-abundance matrix per rank ────────────────────────
  // Each sample gets a Dirichlet-ish draw (via normalized Gamma-like weights),
  // with a mild "Treatment" effect on the 2nd and 4th ranked taxa so alpha/PCoA/
  // PERMANOVA all show a plausible group signal instead of pure noise.
  function gammaLike() { // sum of exponentials ~ Gamma(k=3)
    return -Math.log(rand() + 1e-9) - Math.log(rand() + 1e-9) - Math.log(rand() + 1e-9);
  }

  function buildMatrixForRank(rank) {
    const taxa = TAXA_BY_RANK[rank];
    const nTaxa = taxa.length;
    // base popularity weight per taxon (skewed so early taxa dominate)
    const baseWeight = taxa.map((_, i) => 1 / Math.pow(i + 1, 0.65));

    const matrix = taxa.map(() => new Array(SAMPLES.length).fill(0));

    SAMPLES.forEach((sid, sIdx) => {
      const meta = METADATA[sid];
      const weights = baseWeight.map((w, i) => {
        let wt = w * gammaLike();
        if (meta.group === 'Treatment' && i === 1) wt *= 1.8; // boost 2nd taxon
        if (meta.group === 'Treatment' && i === 3) wt *= 0.5; // suppress 4th taxon
        if (meta.timepoint === 'Week 8' && i === 0) wt *= 1.15;
        return Math.max(wt, 0.001);
      });
      const total = weights.reduce((a, b) => a + b, 0);
      weights.forEach((w, i) => { matrix[i][sIdx] = (w / total) * 100; });
    });

    return { taxa: taxa.slice(), matrix };
  }

  const RANK_MATRIX_CACHE = {};
  function getRankMatrix(rank) {
    if (!RANK_MATRIX_CACHE[rank]) RANK_MATRIX_CACHE[rank] = buildMatrixForRank(rank);
    return RANK_MATRIX_CACHE[rank];
  }

  // ── MOCK_TAXA — matches /taxabarplot?rank= response shape ───────────────
  const MOCK_TAXA = {};
  Object.keys(TAXA_BY_RANK).forEach((rank) => {
    const { taxa, matrix } = getRankMatrix(rank);
    MOCK_TAXA[rank] = {
      samples: SAMPLES.slice(),
      metadata: METADATA,
      taxa,
      matrix,
    };
  });

  // ── alpha diversity metrics derived from each rank's matrix ─────────────
  // Shannon / richness / Simpson computed straight off the relative-abundance
  // matrix, per sample, per rank — with a small extra "Treatment" bump on
  // Shannon/richness so the demo hypothesis test has something to find.
  function diversityFor(rank) {
    const { taxa, matrix } = getRankMatrix(rank);
    const out = {};
    SAMPLES.forEach((sid, sIdx) => {
      const props = taxa.map((_, tIdx) => matrix[tIdx][sIdx] / 100).filter((p) => p > 0.0001);
      const shannon = -props.reduce((s, p) => s + p * Math.log(p), 0);
      const simpson = 1 - props.reduce((s, p) => s + p * p, 0);
      const richness = props.length;
      out[sid] = { shannon, simpson, richness };
    });
    return out;
  }

  const ALPHA_METRICS = ['shannon', 'richness', 'simpson'];
  const ALPHA_RANKS = ['phylum', 'class', 'order', 'family', 'genus', 'species', 'taxon_name'];
  const RANK_LABEL_MAP = {
    phylum: 'Phylum', class: 'Class', order: 'Order', family: 'Family',
    genus: 'Genus', species: 'Species', taxon_name: 'taxon_name',
  };

  const MOCK_ALPHA = []; // flat array: { sample_id, metrics, value, rank, ...metadata }
  ALPHA_RANKS.forEach((rankKey) => {
    const div = diversityFor(RANK_LABEL_MAP[rankKey]);
    SAMPLES.forEach((sid) => {
      const meta = METADATA[sid];
      ALPHA_METRICS.forEach((metric) => {
        let value = div[sid][metric];
        // gentle group effect, layered on top of the matrix-derived value
        if (meta.group === 'Treatment') {
          if (metric === 'shannon') value += 0.35 + rand() * 0.15;
          if (metric === 'richness') value += 1 + Math.floor(rand() * 2);
          if (metric === 'simpson') value = Math.min(0.98, value + 0.03 + rand() * 0.03);
        }
        MOCK_ALPHA.push({
          sample_id: sid,
          rank: rankKey,
          metrics: metric,
          value: Number(value.toFixed(4)),
          group: meta.group,
          timepoint: meta.timepoint,
          subject_id: meta.subject_id,
          site: meta.site,
          sex: meta.sex,
          age: meta.age,
          bmi: meta.bmi,
        });
      });
    });
  });

  // ── rarefaction curves (/alphadepths) ────────────────────────────────────
  // For each sample × metric, an asymptotic curve across increasing read depth.
  const DEPTH_CHECKPOINTS = [500, 1000, 2000, 4000, 6000, 8000, 10000, 14000, 18000, 22000];
  const MOCK_RAREFACTION = [];
  SAMPLES.forEach((sid) => {
    const meta = METADATA[sid];
    const div = diversityFor('Genus')[sid];
    ALPHA_METRICS.forEach((metric) => {
      const asymptote = div[metric] * (meta.group === 'Treatment' ? 1.05 : 1);
      DEPTH_CHECKPOINTS.forEach((depth) => {
        // saturating curve: v(depth) = asymptote * (1 - e^-k*depth), plus small noise
        const k = 0.00025 + rand() * 0.00008;
        const noise = (randn() * 0.02) * asymptote;
        const value = Math.max(0, asymptote * (1 - Math.exp(-k * depth)) + noise);
        MOCK_RAREFACTION.push({
          sample_id: sid,
          depth,
          metrics: metric,
          value: Number(value.toFixed(4)),
        });
      });
    });
  });

  // ── PCoA (beta diversity ordination) ─────────────────────────────────────
  // Build 2D coordinates by clustering samples around a per-group centroid,
  // scaled/jittered per distance metric, with plausible variance-explained %.
  function mockPcoa(rank, distance) {
    const groupCentroid = { Control: [-1.1, 0.2], Treatment: [1.1, -0.15] };
    const spread = distance === 'jaccard' ? 0.85 : 0.55;
    const coordinates = SAMPLES.map((sid) => {
      const meta = METADATA[sid];
      const centroid = groupCentroid[meta.group] || [0, 0];
      const tpShift = meta.timepoint === 'Week 8' ? 0.25 : -0.1;
      return {
        sample: sid,
        pc1: Number((centroid[0] + tpShift + randn() * spread).toFixed(4)),
        pc2: Number((centroid[1] + randn() * spread * 0.8).toFixed(4)),
        group: meta.group,
        timepoint: meta.timepoint,
        subject_id: meta.subject_id,
        site: meta.site,
        sex: meta.sex,
      };
    });
    const varPc1 = distance === 'jaccard' ? 28.4 : 34.7;
    const varPc2 = distance === 'jaccard' ? 15.9 : 19.2;
    return {
      coordinates,
      meta_columns: ['group', 'timepoint', 'subject_id', 'site', 'sex'],
      variance_explained: { PC1: varPc1, PC2: varPc2 },
      distance,
      rank,
    };
  }

  // ── UPGMA dendrogram + taxa bar ───────────────────────────────────────────
  // Simple agglomerative clustering (average-linkage) run on Euclidean distance
  // between each sample's abundance vector at the requested rank, so the tree
  // actually reflects the mock matrix rather than being arbitrary.
  function euclidean(a, b) {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2;
    return Math.sqrt(s);
  }

  function upgmaCluster(sampleVectors, sampleIds) {
    // clusters: { id, members:[sampleIds...], height }
    let clusters = sampleIds.map((sid) => ({ id: 'leaf_' + sid, members: [sid], height: 0 }));
    let nextInternalId = 0;
    // average-linkage distance: mean pairwise Euclidean distance between every
    // member of c1 and every member of c2, looked up by sample id -> vector.
    function pairDist(c1, c2) {
      let sum = 0, n = 0;
      c1.members.forEach((m1) => {
        const v1 = sampleVectors[sampleIds.indexOf(m1)];
        c2.members.forEach((m2) => {
          const v2 = sampleVectors[sampleIds.indexOf(m2)];
          sum += euclidean(v1, v2);
          n++;
        });
      });
      return sum / n;
    }

    while (clusters.length > 1) {
      let best = null, bestDist = Infinity;
      for (let i = 0; i < clusters.length; i++) {
        for (let j = i + 1; j < clusters.length; j++) {
          const d = pairDist(clusters[i], clusters[j]);
          if (d < bestDist) { bestDist = d; best = [i, j]; }
        }
      }
      const [i, j] = best;
      const c1 = clusters[i], c2 = clusters[j];
      const merged = {
        id: 'node_' + (nextInternalId++),
        members: c1.members.concat(c2.members),
        height: bestDist,
        left: c1, right: c2,
      };
      clusters = clusters.filter((_, idx) => idx !== i && idx !== j);
      clusters.push(merged);
    }
    return clusters[0]; // root
  }

  // assign leaf positions (1..N) via in-order traversal of the dendrogram, and
  // emit line segments {x,xend,y,yend} in the same shape the tree renderer expects.
  function dendrogramToSegments(root) {
    let leafCounter = 0;
    const leafPos = {};
    const order = [];

    function assignLeaves(node) {
      if (!node.left && !node.right) {
        leafCounter += 1;
        leafPos[node.members[0]] = leafCounter;
        order.push(node.members[0]);
        node._y = leafCounter;
        return;
      }
      assignLeaves(node.left);
      assignLeaves(node.right);
      node._y = (node.left._y + node.right._y) / 2;
    }
    assignLeaves(root);

    const segments = [];
    function walk(node) {
      if (!node.left && !node.right) return;
      // vertical connector for left child: from node height to child height, at child's y
      segments.push({ x: node.height, xend: node.left.height, y: node._y, yend: node.left._y });
      segments.push({ x: node.height, xend: node.right.height, y: node._y, yend: node.right._y });
      // horizontal bars for each child down to its own y at its own height (drawn as the
      // connector itself above is sufficient for a simple angular dendrogram look)
      walk(node.left);
      walk(node.right);
    }
    walk(root);

    return { order, segments, leafPos };
  }

  function mockUpgma(rank, distance) {
    const rankLabel = RANK_LABEL_MAP[rank] || rank;
    const { taxa, matrix } = getRankMatrix(rankLabel);
    const vectors = SAMPLES.map((sid, sIdx) => taxa.map((_, tIdx) => matrix[tIdx][sIdx]));
    // jaccard distance flavor: just re-scale vectors a bit differently for visual variety
    const scaledVectors = distance === 'jaccard' ? vectors.map((v) => v.map((x) => Math.sqrt(x))) : vectors;

    const root = upgmaCluster(scaledVectors, SAMPLES);
    const { order, segments } = dendrogramToSegments(root);

    const n = SAMPLES.length;
    // sample_index_map: for position i in `order` (dendrogram/sample_order), which
    // 1-based column of `matrix` does it correspond to?
    const sample_index_map = order.map((sid) => SAMPLES.indexOf(sid) + 1);

    const taxa_means = taxa.map((_, tIdx) => {
      const vals = matrix[tIdx];
      return vals.reduce((a, b) => a + b, 0) / vals.length;
    });

    return {
      n_samples: n,
      rank: rankLabel,
      distance,
      taxa,
      taxa_means,
      samples: SAMPLES.slice(),
      matrix,
      sample_order: order,
      sample_index_map,
      segments,
    };
  }

  // ── PERMANOVA ─────────────────────────────────────────────────────────────
  function mockPermanovaMeta(rank) {
    return {
      meta_columns: ['group', 'timepoint', 'site', 'sex'],
      n_samples: SAMPLES.length,
      rank,
    };
  }

  function mockPermanova(rank, distance, covariates) {
    const results = covariates.map((cov) => {
      // 'group' and 'timepoint' get a stronger, more significant signal in this
      // mock dataset (since the matrix generator biases abundances by those
      // fields); 'site'/'sex' are closer to noise.
      const isStrong = cov === 'group' || cov === 'timepoint';
      const R2 = isStrong ? 0.12 + rand() * 0.10 : 0.01 + rand() * 0.05;
      const F_value = Number((R2 / (1 - R2) * (SAMPLES.length - 2)).toFixed(3));
      const p_value = isStrong ? Number((0.001 + rand() * 0.02).toFixed(4)) : Number((0.15 + rand() * 0.6).toFixed(4));
      return { covariate: cov, R2: Number(R2.toFixed(4)), F_value, p_value };
    });
    return {
      results,
      distance,
      rank,
      permutations: 999,
      n_samples: SAMPLES.length,
    };
  }

  // ── client-side hypothesis test approximation ────────────────────────────
  // Approximates a Wilcoxon rank-sum (independent) / signed-rank (paired) test
  // using a normal approximation to the rank-sum statistic. This is NOT a
  // substitute for R's exact wilcox.test — it's a lightweight stand-in so the
  // "Run hypothesis test" button produces plausible, self-consistent p-values
  // in this offline demo. BH (Benjamini-Hochberg) adjustment is applied across
  // all pairwise comparisons, matching the real backend's adjustment method.
  function erf(x) {
    // Abramowitz-Stegun approximation
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741,
      a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }
  function normalCdf(z) { return 0.5 * (1 + erf(z / Math.sqrt(2))); }

  function ranksOf(values) {
    const idx = values.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
    const ranks = new Array(values.length);
    let i = 0;
    while (i < idx.length) {
      let j = i;
      while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++;
      const avgRank = (i + j) / 2 + 1;
      for (let k = i; k <= j; k++) ranks[idx[k][1]] = avgRank;
      i = j + 1;
    }
    return ranks;
  }

  function wilcoxRankSumApprox(g1, g2) {
    const n1 = g1.length, n2 = g2.length;
    if (n1 < 2 || n2 < 2) return null;
    const combined = g1.concat(g2);
    const ranks = ranksOf(combined);
    const R1 = ranks.slice(0, n1).reduce((a, b) => a + b, 0);
    const U1 = R1 - (n1 * (n1 + 1)) / 2;
    const meanU = (n1 * n2) / 2;
    const sdU = Math.sqrt((n1 * n2 * (n1 + n2 + 1)) / 12);
    if (sdU === 0) return null;
    const z = (U1 - meanU) / sdU;
    const p = 2 * (1 - normalCdf(Math.abs(z)));
    return Math.min(1, Math.max(0, p));
  }

  function wilcoxSignedRankApprox(pairsA, pairsB) {
    const diffs = pairsA.map((a, i) => a - pairsB[i]).filter((d) => d !== 0);
    const n = diffs.length;
    if (n < 2) return null;
    const absRanks = ranksOf(diffs.map(Math.abs));
    const Wplus = diffs.reduce((s, d, i) => s + (d > 0 ? absRanks[i] : 0), 0);
    const meanW = (n * (n + 1)) / 4;
    const sdW = Math.sqrt((n * (n + 1) * (2 * n + 1)) / 24);
    if (sdW === 0) return null;
    const z = (Wplus - meanW) / sdW;
    const p = 2 * (1 - normalCdf(Math.abs(z)));
    return Math.min(1, Math.max(0, p));
  }

  function benjaminiHochberg(pvals) {
    const m = pvals.length;
    const indexed = pvals.map((p, i) => ({ p, i })).sort((a, b) => a.p - b.p);
    let prevAdj = 1;
    const adj = new Array(m);
    for (let k = m - 1; k >= 0; k--) {
      const rank = k + 1;
      const raw = indexed[k].p * m / rank;
      prevAdj = Math.min(prevAdj, raw);
      adj[indexed[k].i] = Math.min(1, prevAdj);
    }
    return adj;
  }

  // rows: alphaData rows already filtered to the active sample set.
  // groupVar: metadata column to compare across. paired: bool. subjectVar: column
  // used to align pairs when paired=true.
  function mockAlphaStats({ rows, groupVar, paired, subjectVar }) {
    const groups = [...new Set(rows.map((r) => r[groupVar]))].sort();
    const comparisons = [];
    for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) {
        comparisons.push([groups[i], groups[j]]);
      }
    }

    const rawResults = comparisons.map(([g1, g2]) => {
      const rowsG1 = rows.filter((r) => r[groupVar] === g1);
      const rowsG2 = rows.filter((r) => r[groupVar] === g2);

      if (!paired) {
        const vals1 = rowsG1.map((r) => r.value);
        const vals2 = rowsG2.map((r) => r.value);
        const p = wilcoxRankSumApprox(vals1, vals2);
        if (p === null) return { group1: g1, group2: g2, p_value: null, error: 'Not enough samples in one or both groups.' };
        return { group1: g1, group2: g2, p_value: Number(p.toFixed(6)) };
      }

      // paired: align by subjectVar, keep only subjects present in both groups
      const bySubjA = new Map(rowsG1.map((r) => [r[subjectVar], r.value]));
      const bySubjB = new Map(rowsG2.map((r) => [r[subjectVar], r.value]));
      const sharedSubjects = [...bySubjA.keys()].filter((s) => bySubjB.has(s));
      if (sharedSubjects.length < 2) {
        return { group1: g1, group2: g2, p_value: null, error: 'Fewer than 2 matched subjects between groups.' };
      }
      const a = sharedSubjects.map((s) => bySubjA.get(s));
      const b = sharedSubjects.map((s) => bySubjB.get(s));
      const p = wilcoxSignedRankApprox(a, b);
      if (p === null) return { group1: g1, group2: g2, p_value: null, error: 'Could not compute paired test (all differences zero).' };
      return { group1: g1, group2: g2, p_value: Number(p.toFixed(6)) };
    });

    const validIdx = rawResults.map((r, i) => (r.p_value !== null ? i : -1)).filter((i) => i >= 0);
    const validP = validIdx.map((i) => rawResults[i].p_value);
    const adj = benjaminiHochberg(validP);
    validIdx.forEach((idx, k) => { rawResults[idx].p_value_adj = adj[k]; });

    return rawResults;
  }


  // ── species-group reference table (genus -> species-group -> members) ──────
  // Embedded verbatim from species_group.tsv (static, parsed once) so the info
  // popup on each analysis chart header can show what a genus-level "group"
  // contains when species-level results are collapsed/rolled up.
  const SPECIES_GROUP_TSV = "Genus\tSpecies Group\tMember\nAcinetobacter\tcalcoaceticus_group\tcalcoaceticus, geminorum, oleivorans\nAcinetobacter\tcourvalinii_group\tcourvalinii, kanungonis, proteolyticus, vivianii\nAcinetobacter\tguerrae_group\tguerrae, ursingii\nAeromonas\taquatilis_group\taquatilis, encheleia, enteropelogenes, eucrenophila, hydrophila, sanarellii, taiwanensis, tecta\nAeromonas\tcavernicola_group\tcavernicola, fluvialis, lacus, rivipollensis, veronii\nAlteromonas\tabrolhosensis_group\tabrolhosensis, australica, litorea, mediterranea, portus, stellipolaris\nAlteromonas\talba_group\talba, confluentis, halophila\nBacillus\taerius_group\taerius, aerophilus, altitudinis, glycinifermentans, licheniformis, piscis, pumilus, safensis, sonorensis, stratosphericus, swezeyi, xiamenensis, zhangzhouensis\nBacillus\tamyloliquefaciens_group\tamyloliquefaciens, atrophaeus, nakamurai, nematocida, siamensis, subtilis, vallismortis, velezensis\nBacillus\taustralimaris_group\taustralimaris, pumilus, stratosphericus, xiamenensis\nBacillus\tbingmayongensis_group\tbingmayongensis, clarus, marcorestinctum, pseudomycoides\nBacteroides\tkoreensis_group\tkoreensis, kribbi, ovatus\nChryseobacterium\taahli_group\taahli, arachidis, binzhouense, camelliae, cheonjiense, chungangensis, daecheongense, defluvii, endophyticum, formosense, gambrini, geocarposphaerae, ginsenosidimutans, gwangjuense, hagamense, mulctrae, nepalense, paridis, piperi, profundimaris, proteolyticum, solani, soldanellicola, soli, subflavum, tagetis, taiwanense, takakiae, zhengzhouense\nChryseobacterium\tantibioticum_group\tantibioticum, shigense, vrystaatense\nChryseobacterium\taquifrigidense_group\taquifrigidense, aurantiacum, bernardetii, culicis, jejuense, nakagawai, pennae, rhizosphaerae, vietnamense\nChryseobacterium\tarthrosphaerae_group\tarthrosphaerae, aureum, candidae, contaminans, gleum, lecithinasegens, oranimense, panacisoli, rhizoplanae, sediminis\nChryseobacterium\tjoostei_group\tjoostei, luteum, oleae\nCitrobacter\tbraakii_group\tbraakii, murliniae, pasteurii, tructae, werkmanii\nCitrobacter\trodentium_group\trodentium, sedlakii, youngae\nDemequina\tgelatinilytica_group\tgelatinilytica, rhizosphaerae, sediminis, silvatica, soli, subtropica\nEnterococcus\tasini_group\tasini, florum, mundtii, pallens\nEnterococcus\tcasseliflavus_group\tcasseliflavus, dispar, dongliensis, faecium, gallinarum, hermanniensis, hirae, hulanensis, innesii, malodoratus, mediterraneensis, pingfangensis, pseudoavium, saigonensis, xiangfangensis\nEnterococcus\thaemoperoxidus_group\thaemoperoxidus, larvae, termitis, ureasiticus, wangshanyuanii\nEnterococcus\tlactis_group\tlactis, phoeniculicola, rivorum, thailandicus\nHalomonas\taidingensis_group\taidingensis, alimentaria, shengliensis, tibetensis\nHalomonas\tdenitrificans_group\tdenitrificans, nitroreducens, stenophila, urmiana\nHalomonas\tfontilapidosi_group\tfontilapidosi, tabrizica, ventosae\nLacticaseibacillus\tabsianus_group\tabsianus, brantae, saniviri\nLacticaseibacillus\tparahuelsenbergensis_group\tparahuelsenbergensis, rhamnosus, styriensis\nLactiplantibacillus\targentoratensis_group\targentoratensis, daoliensis, garii, herbarum, pingfangensis\nLactiplantibacillus\tdaowaiensis_group\tdaowaiensis, dongliensis\nLentilactobacillus\tbuchneri_group\tbuchneri, kefiri, kisonensis, parabuchneri, rapi\nLentilactobacillus\tdiolivorans_group\tdiolivorans, farraginis, hilgardii, raoultii\nLigilactobacillus\tanimalis_group\tanimalis, apodemi, murinus\nLimosilactobacillus\tagrestis_group\tagrestis, balticus, fastidiosus, frumenti, reuteri\nLimosilactobacillus\talbertensis_group\talbertensis, rudii\nLiquorilactobacillus\taquaticus_group\taquaticus, capillatus, uvarum\nMarinobacter\talexandrii_group\talexandrii, caseinilyticus, salinus, sediminum, similis\nMarinobacter\talkaliphilus_group\talkaliphilus, excellens, shengliensis\nMarinobacter\tantarcticus_group\tantarcticus, gelidimuriae, maritimus\nMarinobacter\tbryozoorum_group\tbryozoorum, gudaonensis, segnicrescens\nMarinobacter\tdenitrificans_group\tdenitrificans, orientalis, salarius\nMarinobacter\tmobilis_group\tmobilis, xestospongiae, zhejiangensis\nMethylophilus\taquaticus_group\taquaticus, flavus, leisingeri, methylotrophus, rhizosphaerae\nPhotobacterium\tarenosum_group\tarenosum, galatheae, salinisoli\nPhotobacterium\tcarnosum_group\tcarnosum, iliopiscarium, kishitanii, phosphoreum\nPseudoalteromonas\tbyunsanensis_group\tbyunsanensis, donghaensis, lipolytica\nPseudoalteromonas\tcaenipelagi_group\tcaenipelagi, espejiana, galatheae, hodoensis, maricaloris, peptidolytica, spiralis, telluritireducens\nStaphylococcus\taureus_group\taureus, argenteus, schweitzeri\nStaphylococcus\tepidermidis_group\tepidermidis, capitis, caprae\nStreptococcus\tmitis_group\tmitis, oralis\nStreptomyces\tabietis_group\tabietis, fildesensis, polaris, septentrionalis, urticae\nStreptomyces\tabikoensis_group\tabikoensis, acidiscabies, albidoflavus, ascomycinicus, chattanoogensis, chrysomallus, coelicolor, europaeiscabiei, formicae, fradiae, geldanamycininus, globisporus, griseus, hygroscopicus, lactacystinicus, lavendulae, netropsis, nodosus, pilosus, rapamycinicus, rubiginosus, spectabilis, staurosporininus, stelliscabiei, thermodiastaticus, tsukubensis, venezuelae, violaceoruber, virginiae, viridochromogenes\nStreptomyces\talbiaxialis_group\talbiaxialis, baliensis, daliensis, sparsus, tardus, tateyamensis, xinghaiensis\nStreptomyces\talbicerus_group\talbicerus, altiplanensis, sudanensis\nStreptomyces\talbiflavescens_group\talbiflavescens, amakusaensis, apocyni, arcticus, castrisilvae, drozdowiczii, huasconensis, inusitatus, kanamyceticus, longisporoflavus, qinzhouensis, rosealbus\nStreptomyces\talbus_group\talbus, cacaoi, spirodelae\nStreptomyces\tarboris_group\tarboris, geranii\nStreptomyces\tatacamensis_group\tatacamensis, chitinivorans, diacarni, mangrovi, pini, reniochalinae, taklimakanensis\nStreptomyces\tblattellae_group\tblattellae, cinereus, montanus\nStreptomyces\tbohaiensis_group\tbohaiensis, sodiiphilus\nStreptomyces\tboninensis_group\tboninensis, smaragdinus\nStreptomyces\tcaldifontis_group\tcaldifontis, mesophilus, polyasparticus\nStreptomyces\tcarpaticus_group\tcarpaticus, ginkgonis, harbinensis\nStreptomyces\tglaucosporus_group\tglaucosporus, macrosporus, megasporus\nStreptomyces\thainanensis_group\thainanensis, manganisoli, mayteni\nStreptomyces\thebeiensis_group\thebeiensis, spongiicola, triticagri, zinciresistens\nStreptomyces\tluteolifulvus_group\tluteolifulvus, populi, triticiradicis\nStreptomyces\tlycii_group\tlycii, rubrus, verrucosisporus\nVibrio\talginolyticus_group\talginolyticus, campbellii, chemaguriensis, fortis, harveyi, jasicida, neocaledonicus, ouci, owensii, parahaemolyticus, pelagius, proteolyticus, sagamiensis, vulnificus\nVibrio\tartabrorum_group\tartabrorum, celticus, crassostreae, gigantis, toranzoniae\nVibrio\tatlanticus_group\tatlanticus, bathopelagicus, kanaloae, lentus, splendidus\nVibrio\tbreoganii_group\tbreoganii, comitans, ezurae, halioticoli, neonatus, superstes\nVibrio\tcaribbeanicus_group\tcaribbeanicus, coralliilyticus, hepatarius, neptunius, sinaloensis, xuii";
  const SPECIES_GROUPS = SPECIES_GROUP_TSV.trim().split("\n").slice(1).map((line) => {
    const [genus, group, members] = line.split("\t");
    return { genus, group, members };
  });

  // ── expose ────────────────────────────────────────────────────────────────
  global.MOCK = {
    SAMPLES,
    METADATA,
    TAXA_BY_RANK,
    MOCK_TAXA,
    MOCK_ALPHA,
    MOCK_RAREFACTION,
    mockPcoa,
    mockUpgma,
    mockPermanovaMeta,
    mockPermanova,
    mockAlphaStats,
    SPECIES_GROUPS,
  };
})(window);
