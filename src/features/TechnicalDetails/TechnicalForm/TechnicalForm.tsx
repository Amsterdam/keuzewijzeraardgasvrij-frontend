import { useForm } from "react-hook-form";
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

const ENV = "ACCEPTANCE";

type Props = {
  onNext: () => void;
};

export default function TechnicalForm({ onNext }: Props) {
  const defaultValues: FormValues = ENV
    ? generateDummyData()
    : defaultFormValues();

  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(technicalFormSchema),
    defaultValues: defaultValues,
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) =>
      apiClient.post("/calculation-inputs/", mapFormValues(data)),
    onSuccess: (response) => {
      console.log("Form submitted successfully:", response);
      onNext();
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const isLoading = mutation.isPending;

  const onSubmit = (data: FormValues) => {
    console.log(" Submitting form with data:", data);
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
        <Button type="submit" disabled={!form.formState.isValid || isLoading}>
          Volgende stap
        </Button>
      </ActionGroup>
    </FormProvider>
  );
}
