import { stitch } from "../src/stitch";
import { fetch } from "./__mocks__/fetch";

describe("stitch", () => {
  it("Should return stitched function with method", async () => {
    const stitched = stitch({
      path: "https://reqres.in/api/users/{id}",
      method: "PATCH",
    });
    expect(stitched).toBeInstanceOf(Function);

    await stitched({
      params: { id: 1 },
      body: {
        name: "morpheus v2",
        job: "zion resident v2",
      },
    });

    expect(fetch).toHaveBeenCalledWith("https://reqres.in/api/users/1", {
      method: "PATCH",
      body: JSON.stringify({
        name: "morpheus v2",
        job: "zion resident v2",
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  });
});
