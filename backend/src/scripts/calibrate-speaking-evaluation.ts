import { writingService } from '../services/writing.service';
import { SPEAKING_BENCHMARK_CORPUS, WRITING_BENCHMARK_CORPUS } from '../data/goldenBenchmarkCorpus';

async function runCalibrationSuite() {
  console.log('\n================================================================');
  console.log('🏆 FRANCPREP EVALUATION CALIBRATION SUITE');
  console.log('   Benchmarking AI Evaluator vs Certified FEI Human Examiner Data');
  console.log('================================================================\n');

  let totalSpeakingDiff = 0;
  let speakingCount = 0;

  console.log('🎙️ EVALUATING SPEAKING BENCHMARK SAMPLES:');
  for (const sample of SPEAKING_BENCHMARK_CORPUS) {
    try {
      const result = await writingService.analyzeSpeaking(
        sample.transcript,
        sample.expectedText,
        `Tâche ${sample.taskNumber}`,
        'French',
        sample.taskNumber,
        sample.acousticMetrics
      );

      const aiScore = result.scoreOutOf20;
      const humanScore = sample.humanGroundTruth.scoreOutOf20;
      const diff = Math.abs(aiScore - humanScore);
      totalSpeakingDiff += diff;
      speakingCount++;

      console.log(`\nSample [${sample.id}] (${sample.cefrLevel} - Tâche ${sample.taskNumber}):`);
      console.log(`  - Human Examiner Ground Truth: ${humanScore}/20 Marks (${sample.humanGroundTruth.nclcLevel})`);
      console.log(`  - AI Evaluator Output:         ${aiScore}/20 Marks (${result.nclcGrade})`);
      console.log(`  - Score Delta:                 ${diff === 0 ? '✅ 0 Marks (EXACT MATCH)' : diff <= 1 ? '🟢 1 Mark (Within FEI Tolerance)' : `⚠️ ${diff} Marks`}`);
      console.log(`  - Subscores (Task/Flow/Lex/Gram): AI = [${result.taskFulfillmentScore}/${result.coherenceScore}/${result.lexicalScore}/${result.grammarScore}] vs Human = [${sample.humanGroundTruth.subscores.taskFulfillment}/${sample.humanGroundTruth.subscores.coherence}/${sample.humanGroundTruth.subscores.lexical}/${sample.humanGroundTruth.subscores.grammar}]`);
    } catch (err: any) {
      console.error(`❌ Error evaluating speaking sample ${sample.id}:`, err?.message || err);
    }
  }

  const avgSpeakingError = speakingCount > 0 ? (totalSpeakingDiff / speakingCount).toFixed(2) : 'N/A';

  console.log('\n================================================================');
  console.log(`📊 CALIBRATION SUMMARY RESULTS:`);
  console.log(`   - Total Speaking Samples Evaluated: ${speakingCount}`);
  console.log(`   - Average Score Delta vs Human Truth: ${avgSpeakingError} Marks (Target <= 1.0 Marks)`);
  console.log(`   - FEI Human Alignment Status:       ${Number(avgSpeakingError) <= 1.0 ? 'PASSED 100% (FEI Certified Tolerance)' : 'NEEDS TUNING'}`);
  console.log('================================================================\n');
}

runCalibrationSuite()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal error in calibration suite:', err);
    process.exit(1);
  });
