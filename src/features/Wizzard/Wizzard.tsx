import { useState } from "react";
import { Grid } from "@amsterdam/design-system-react";

import { Steps } from "@/components";
import { steps } from "./steps.config.ts";
import AddressSearch from "../AddressSearch/AddressSearch";

export default function Wizzard() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Grid gapVertical="large" paddingBottom="x-large">
      <Grid.Cell span="all">
        <Steps
          steps={steps}
          currentStep={currentStep}
          onPrevious={() => setCurrentStep(currentStep - 1)}
        />
      </Grid.Cell>
      {currentStep === 1 && (
        <Grid.Cell span={{ narrow: 4, medium: 6, wide: 7 }}>
          <AddressSearch onNext={() => setCurrentStep(2)} />
        </Grid.Cell>
      )}
      {currentStep === 2 && <Grid.Cell span="all">Form</Grid.Cell>}
      {currentStep === 3 && <Grid.Cell span="all">Resultaat</Grid.Cell>}
    </Grid>
  );
}
