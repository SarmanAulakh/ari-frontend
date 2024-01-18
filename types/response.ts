interface ExpressValidatorError {
  location: string;
  msg: string;
  param: string;
}

export interface JResponse {
  status: "success" | "fail" | "error";
  data?: ExpressValidatorError | any;
  message?: string;
}