import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  InvalidFormAlert,
  ActionGroup,
} from "@amsterdam/design-system-react";
import { FormProvider, mapErrorsToAlert } from "@amsterdam/ee-ads-rhf";
import { zodResolver } from "@hookform/resolvers/zod";

import { technicalFormSchema, type FormValues } from "./technicalFormSchema";
import { TechnicalFormBuilding } from "./sections/TechnicalFormBuilding";
import { TechnicalFormEnergy } from "./sections/TechnicalFormEnergy";
import { TechnicalFormWishes } from "./sections/TechnicalFormWishes";
import { defaultFormValues, generateDummyData } from "./formDefaults";

const ENV = "ACCEPTANCE";

export default function TechnicalForm() {
  const defaultValues: FormValues = ENV
    ? generateDummyData()
    : defaultFormValues();

  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(technicalFormSchema),
    defaultValues: defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    console.log(" Submitting form with data: ", data);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
