import { ErrorIcon } from "@/assets/myIcons";
import { ErrorMessage, ErrorMessageProps } from "formik";

const ErrorMsg = ({ ...errorProps }: ErrorMessageProps) => {
  return (
    <ErrorMessage
      {...errorProps}
      render={(msg: string) => (
        <div className={errorProps.className}>
          <div className="flex gap-2 text-red-700">
            <ErrorIcon className="w-6 h-6" />
            <div>{msg}</div>
          </div>
        </div>
      )}
    />
  );
};

export default ErrorMsg;
