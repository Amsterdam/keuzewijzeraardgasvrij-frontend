import { useMemo, useState } from "react";
import { Grid } from "@amsterdam/design-system-react";

import { Steps } from "@/components";
import { steps, dummyAddress } from "./steps.config";
import AddressSearch from "../AddressSearch/AddressSearch";
import TechnicalDetails from "../TechnicalDetails/TechnicalDetails";
import ResultsView from "../ResultsView/ResultsView";
import { DEFAULT_CONTENT_SPAN } from "@/constants";
import type { CalculationResult } from "@/types/CalculationResult";
import type { FormValues } from "../TechnicalDetails/TechnicalForm/technicalFormSchema";

export default function Wizard() {
  const bagId = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("bagId");
  }, []);
  const [currentStep, setCurrentStep] = useState(bagId ? 2 : 1);
  const [selectedAddress, setSelectedAddress] =
    useState<BAGPdokAddress>(dummyAddress);
  const [results, setResults] = useState<CalculationResult[] | undefined>(
    undefined,
  );
  const [technicalFormValues, setTechnicalFormValues] = useState<
    Partial<FormValues> | undefined
  >(undefined);

  return (
    <Grid gapVertical="large" paddingBottom="x-large">
      <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
        <Steps
          steps={steps}
          currentStep={currentStep}
          onPrevious={() => setCurrentStep(currentStep - 1)}
        />
      </Grid.Cell>
      {currentStep === 1 && (
        <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
          <AddressSearch
            onSelectAddress={(address) => {
              setSelectedAddress(address);
              setCurrentStep(2);
            }}
          />
        </Grid.Cell>
      )}
      {currentStep === 2 && (
        <Grid.Cell span="all">
          <TechnicalDetails
            address={selectedAddress}
            savedValues={technicalFormValues}
            onNext={(
              results: CalculationResult[],
              formValues: Partial<FormValues>,
            ) => {
              setTechnicalFormValues(formValues);
              setResults(results);
              setCurrentStep(3);
            }}
          />
        </Grid.Cell>
      )}
      {currentStep === 3 && (
        <Grid.Cell span="all">
          <ResultsView results={results} />
        </Grid.Cell>
      )}
    </Grid>
  );
}
