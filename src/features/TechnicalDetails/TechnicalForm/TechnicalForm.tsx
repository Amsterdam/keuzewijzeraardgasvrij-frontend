import { useMemo } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import {
  Button,
  InvalidFormAlert,
  ActionGroup,
} from "@amsterdam/design-system-react";
import { FormProvider, mapErrorsToAlert } from "@amsterdam/ee-ads-rhf";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/api";
import { technicalFormSchema, type FormValues } from "./technicalFormSchema";
import { TechnicalFormBuilding } from "./sections/TechnicalFormBuilding";
import { TechnicalFormEnergy } from "./sections/TechnicalFormEnergy";
import { TechnicalFormWishes } from "./sections/TechnicalFormWishes";
import { defaultFormValues, generateDummyData } from "./formDefaults";
import { mapFormValues } from "./mapFormValues";
import type { CalculationResults } from "@/types/CalculationResult";

type Props = {
  onNext: (result: CalculationResults) => void;
};

export default function TechnicalForm({ onNext }: Props) {
  const searchParams = new URLSearchParams(window.location.search);

  const shouldUseDummyData = searchParams.get("dummy") === "true";

  const defaultValues: DefaultValues<FormValues> = useMemo(() => {
    return shouldUseDummyData ? generateDummyData() : defaultFormValues();
  }, [shouldUseDummyData]);

  const form = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(technicalFormSchema),
    defaultValues,
  });

  const mutation = useMutation<CalculationResults, Error, FormValues>({
    mutationFn: (data: FormValues) =>
      apiClient.post("/calculation-inputs/", mapFormValues(data)),
    onSuccess: (result) => {
      onNext(result);
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const isLoading = mutation.isPending;

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  const showErrors = Object.keys(form.formState.errors).length > 0;
  const alertErrors = mapErrorsToAlert(form.formState.errors);

  return (
    <FormProvider<FormValues> form={form} onSubmit={onSubmit}>
      {showErrors && (
        <InvalidFormAlert
          errors={alertErrors}
          headingLevel={4}
          className="ams-mb-m"
          data-testid="error-alert"
        />
      )}
      <TechnicalFormBuilding isLoading={isLoading} />
      <TechnicalFormEnergy isLoading={isLoading} />
      <TechnicalFormWishes isLoading={isLoading} />

      <ActionGroup>
        <Button type="submit" disabled={isLoading}>
          Volgende stap
        </Button>
      </ActionGroup>
    </FormProvider>
  );
}
