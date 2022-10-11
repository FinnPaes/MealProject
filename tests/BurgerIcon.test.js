import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Navigation from "~/components/Shared/Navigation.vue";
import BurgerIcon from "~/components/Icon/Burger.vue";

describe("Burger icon test", async () => {
  it("Navigation component contains burger icon component", () => {
    const wrapper = mount(Navigation, {});

    expect(wrapper.findComponent(BurgerIcon).exists()).toBe(true);
  });
});
