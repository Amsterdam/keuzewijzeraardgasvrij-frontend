import { Grid, Paragraph } from "@amsterdam/design-system-react";
import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/api";
import TechnicalForm from "./TechnicalForm/TechnicalForm";
import { DEFAULT_CONTENT_SPAN } from "@/constants";
import type { CalculationResults } from "@/types/CalculationResult";
import { mapFormValues } from "./TechnicalForm/mapFormValues";
import type { FormValues } from "./TechnicalForm/technicalFormSchema";
import { LoadingAdvice } from "@/components";

type Props = {
  address?: BAGPdokAddress;
  onNext: (result: CalculationResults) => void;
};

export default function TechnicalDetails({ address, onNext }: Props) {
  const mutation = useMutation<CalculationResults, Error, FormValues>({
    mutationFn: (data) =>
      apiClient.post(
        "/calculation-inputs/",
        mapFormValues({
          ...data,
          buurtcode: address?.buurtcode,
        }),
      ),
    onSuccess: (result) => {
      onNext(result);
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
      <TechnicalForm mutation={mutation} />
    </>
  );
}
