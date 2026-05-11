import { useMemo, useState } from "react";
import { Grid, Paragraph } from "@amsterdam/design-system-react";

import { Steps } from "@/components";
import { steps, dummyAddress } from "./steps.config.ts";
import AddressSearch from "../AddressSearch/AddressSearch.tsx";
import TechnicalDetails from "../TechnicalDetails/TechnicalDetails.tsx";
import { DEFAULT_CONTENT_SPAN } from "@/constants.ts";

export default function Wizard() {
  const bagId = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("bagId");
  }, []);

  const [currentStep, setCurrentStep] = useState(bagId ? 2 : 1);

  const [selectedAddress, setSelectedAddress] =
    useState<BAGPdokAddress>(dummyAddress);

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
            onNext={() => setCurrentStep(3)}
          />
        </Grid.Cell>
      )}
      {currentStep === 3 && (
        <Grid.Cell span="all">
          <Paragraph>Succesvol resultaat!</Paragraph>
        </Grid.Cell>
      )}
    </Grid>
  );
}
