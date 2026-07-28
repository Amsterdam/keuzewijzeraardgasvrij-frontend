import { describe, expect, it } from "vitest";
import { constructPdokQuery } from "./pdokQueryBuilder";

describe("constructPdokQuery", () => {
  it("filters on Amsterdam and primary addresses by default", () => {
    const query = constructPdokQuery(true, "Damrak 1");

    expect(query).toContain("q=Damrak%201");
    expect(query).toContain("gemeentenaam%3A%28amsterdam%29");
    expect(query).toContain("adrestype%3A%20hoofdadres");
  });

  it("filters on all address types when onlyPrimaryAddress is false", () => {
    const query = constructPdokQuery(false, "Damrak 1");

    expect(query).toContain("type%3Aadres");
    expect(query).not.toContain("hoofdadres");
  });

  it("omits the search term when none is given", () => {
    const query = constructPdokQuery();

    expect(query).not.toMatch(/[?&]q=/);
    expect(query).toContain("gemeentenaam%3A%28amsterdam%29");
  });

  it("always starts with a query prefix", () => {
    expect(constructPdokQuery()).toMatch(/^\?/);
  });
});
