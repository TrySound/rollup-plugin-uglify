import { WorkerFarmOptions } from 'jest-worker';
import type { PluginImpl } from "rollup";
interface UglifyProps extends Partial<Pick<WorkerFarmOptions, 'numWorkers' | 'maxRetries'>> {
}
export declare const uglify: PluginImpl<UglifyProps>;
export {};
//# sourceMappingURL=uglify.d.ts.map