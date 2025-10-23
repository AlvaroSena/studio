import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export function OTPForm() {
  const [value, setValue] = useState("");
  const { verifyOTP } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const session = searchParams.get("session");

  useEffect(() => {
    if (value.length === 6) {
      setIsLoading(true);
      verifyOTP(value, session ?? "").then((status) => {
        if (status === "success") {
          setTimeout(() => {
            setIsLoading(false);
            navigate("/");
          }, 1500);
        } else {
          setIsLoading(false);
          setValue("");
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <form className="flex flex-col gap-6 justify-center items-center my-8">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(v) => setValue(v)}
        disabled={isLoading}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator className="text-muted-foreground" />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      {isLoading && <LoaderCircle className="animate-spin" />}

      <div className="flex flex-row items-center gap-3">
        <p className="text-muted-foreground text-sm">Não recebeu?</p>
        <Button
          variant="link"
          type="submit"
          className="text-emerald-800 dark:text-foreground p-0 text-sm poppins-semibold"
        >
          Enviar novamente
        </Button>
      </div>
    </form>
  );
}
