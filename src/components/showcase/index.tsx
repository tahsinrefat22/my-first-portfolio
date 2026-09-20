import { rankflo } from './rankflo';
import { salestial } from './salestial';
import { jsonparser } from './jsonparser';
import { zoom } from './zoom';
import { provelify } from './provelify';

/* Each product's landing hero and dashboard, built in markup at 640x320 */
export const SHOWCASES = { rankflo, salestial, jsonparser, zoom, provelify } as const;
export type ShowcaseId = keyof typeof SHOWCASES;
