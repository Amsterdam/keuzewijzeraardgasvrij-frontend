import { Heading, Grid, Link } from "@amsterdam/design-system-react";
import { TextInputControl, SelectControl } from "@amsterdam/ee-ads-rhf";
import {
  DEFAULT_SPAN,
  DEFAULT_OPTIONS_BOOLEAN,
  SYSTEM_TYPES,
} from "../formConstants";
import type { FormValues } from "../technicalFormSchema";
import { AdsLabelWithTooltip } from "@/components";

export function TechnicalFormEnergy() {
  return (
    <>
      <Heading level={3}>Energetische gegevens</Heading>
      <Grid
        paddingBottom="x-large"
        paddingTop="large"
        gapVertical="large"
        className="no-padding-inline align-items-end"
      >
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Wordt het tapwater in het gebouw verwarmd met gas?"
            name="tapwaterOpGas"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <SelectControl<FormValues>
            label="Wordt er in het gebouw gekookt met gas?"
            name="kokenOpGas"
            options={DEFAULT_OPTIONS_BOOLEAN}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Gasverbruik VvE totaal (m³)"
            content={
              <div>
                U kunt dit op meerdere manieren achterhalen:
                <br />
                <ul>
                  <li>
                    U kunt het gasverbruik vinden op de eindejaarsafrekening van
                    het gebouw (bij een collectief systeem).
                  </li>
                  <li>
                    U kunt alle eindejaarsafrekeningen van de bewoners optellen
                    (bij individuele systemen).
                  </li>
                  <li>
                    U kunt het gemiddelde gasverbruik per woning van uw postcode
                    vermenigvuldigen met het aantal woningen. Zie hiervoor de{" "}
                    <Link
                      href="https://www.liander.nl/over-ons/open-data#verbruiksdata-kleinverbruikaansluitingen"
                      rel="external noopener"
                      target="_blank"
                    >
                      website van Liander
                    </Link>{" "}
                    en download het bestand "Kleinverbruikgegevens" van het
                    vorige jaar.
                  </li>
                </ul>
              </div>
            }
          />
          <TextInputControl<FormValues>
            name="gasverbruikVveTotaal"
            inputMode="numeric"
            pattern="[0-9]*"
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
            placeholder="Vul in"
          />
        </Grid.Cell>
        <Grid.Cell span={DEFAULT_SPAN}>
          <AdsLabelWithTooltip
            label="Wat is uw huidige systeem?"
            content={
              <div>
                <strong>Individueel warmtesysteem</strong>
                <div>
                  Elke woning of ruimte heeft een eigen verwarmingsinstallatie.
                  Elke bewoner regelt en betaalt de gasrekening zelfstandig bij
                  de leverancier.
                </div>
                <br />
                <strong>Collectief warmtesysteem</strong>
                <div>
                  Meerdere woningen of ruimtes delen één centrale
                  verwarmingsinstallatie. De warmte wordt centraal opgewekt en
                  verdeeld binnen het gebouw.
                </div>
              </div>
            }
          />
          <SelectControl<FormValues>
            name="huidigSysteem"
            options={SYSTEM_TYPES}
            registerOptions={{ required: true }}
            style={{ width: "100%" }}
            hideErrorMessage
          />
        </Grid.Cell>
      </Grid>
    </>
  );
}
