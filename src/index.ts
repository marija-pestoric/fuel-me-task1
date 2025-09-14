import { BASE_URL } from "./constants.js";
import { ReportGenerator } from "./ReportGenerator.js";

const report = new ReportGenerator(BASE_URL)
console.log(report.run())