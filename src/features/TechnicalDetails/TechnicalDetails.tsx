import { Grid, Paragraph } from "@amsterdam/design-system-react";
import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/api";
import TechnicalForm from "./TechnicalForm/TechnicalForm";
import { DEFAULT_CONTENT_SPAN } from "@/constants";
import type { CalculationResult } from "@/types/CalculationResult";
import { mapFormValues } from "./TechnicalForm/mapFormValues";
import type { FormValues } from "./TechnicalForm/technicalFormSchema";
import { LoadingAdvice } from "@/components";

type Props = {
  address?: BAGPdokAddress;
  savedValues?: Partial<FormValues>;
  onNext: (
    results: CalculationResult[],
    formValues: Partial<FormValues>,
  ) => void;
};

export default function TechnicalDetails({
  address,
  savedValues,
  onNext,
}: Props) {
  const mutation = useMutation<CalculationResult[], Error, FormValues>({
    mutationFn: (data) =>
      apiClient.post(
        "/calculation-inputs/",
        mapFormValues({
          ...data,
          buurtcode: address?.buurtcode,
        }),
      ),
    onSuccess: (results, variables) => {
      onNext(results, variables);
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  if (mutation.isPending) {
    return <LoadingAdvice />;
  }
  return (
    <>
      <Grid className="no-padding-inline">
        <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
          <Paragraph className="ams-mb-m">
            Op basis van <strong>{address?.weergavenaam}</strong> hebben wij een
            aantal gegevens opgehaald. Controleer deze gegevens en vul ze aan
            waar nodig.
          </Paragraph>
        </Grid.Cell>
      </Grid>
      <TechnicalForm mutation={mutation} savedValues={savedValues} />
    </>
  );
}
