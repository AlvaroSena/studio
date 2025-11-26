/* eslint-disable @typescript-eslint/no-explicit-any */
export type WeekDayCode = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

export function mapApiStudioScheduleResponse(apiResponse: any[]) {
  const defaults = {
    SUN: { enabled: false, start: "", end: "" },
    MON: { enabled: false, start: "", end: "" },
    TUE: { enabled: false, start: "", end: "" },
    WED: { enabled: false, start: "", end: "" },
    THU: { enabled: false, start: "", end: "" },
    FRI: { enabled: false, start: "", end: "" },
    SAT: { enabled: false, start: "", end: "" },
  };

  apiResponse.forEach((item) => {
    defaults[item.dayOfWeek as WeekDayCode] = {
      enabled: item.enabled,
      start: item.openTime,
      end: item.closeTime,
    };
  });

  return defaults;
}
