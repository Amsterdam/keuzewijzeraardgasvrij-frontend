import { useMemo } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import {
  Button,
  InvalidFormAlert,
  ActionGroup,
} from "@amsterdam/design-system-react";
import { FormProvider, mapErrorsToAlert } from "@amsterdam/ee-ads-rhf";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseMutationResult } from "@tanstack/react-query";

import { technicalFormSchema, type FormValues } from "./technicalFormSchema";
import { TechnicalFormBuilding } from "./sections/TechnicalFormBuilding";
import { TechnicalFormEnergy } from "./sections/TechnicalFormEnergy";
import { TechnicalFormWishes } from "./sections/TechnicalFormWishes";
import { defaultFormValues, generateDummyData } from "./formDefaults";
import type { CalculationResult } from "@/types/CalculationResult";

type Props = {
  mutation: UseMutationResult<CalculationResult[], Error, FormValues>;
  /** Values the user already filled in and submitted this session (e.g. navigated back to this step). Always wins. */
  savedValues?: Partial<FormValues>;
  /** Values fetched from the prefill API for the selected address. Only used if there are no savedValues. */
  prefillValues?: Partial<FormValues>;
};

export default function TechnicalForm({
  mutation,
  savedValues,
  prefillValues,
}: Props) {
  const searchParams = new URLSearchParams(window.location.search);

  const shouldUseDummyData = searchParams.get("dummy") === "true";

  const defaultValues: DefaultValues<FormValues> = useMemo(() => {
    if (savedValues && Object.keys(savedValues).length > 0) {
      return savedValues as DefaultValues<FormValues>;
    }
    if (shouldUseDummyData) {
      return generateDummyData();
    }
    if (prefillValues && Object.keys(prefillValues).length > 0) {
      return prefillValues as DefaultValues<FormValues>;
    }
    return defaultFormValues();
  }, [shouldUseDummyData, savedValues, prefillValues]);

  const form = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(technicalFormSchema),
    defaultValues,
  });

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
      <TechnicalFormBuilding />
      <TechnicalFormEnergy />
      <TechnicalFormWishes />
      <ActionGroup>
        <Button type="submit">Volgende stap</Button>
      </ActionGroup>
    </FormProvider>
  );
}
