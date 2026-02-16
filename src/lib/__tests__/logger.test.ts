import { describe, it, expect, vi, beforeEach } from "vitest";
import { logger } from "../logger";

describe("logger", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("logs info messages", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    logger.info("test message", "test-context");
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0]).toContain("[INFO]");
    expect(spy.mock.calls[0][0]).toContain("[test-context]");
    expect(spy.mock.calls[0][0]).toContain("test message");
  });

  it("logs warn messages", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    logger.warn("warning message");
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0]).toContain("[WARN]");
  });

  it("logs error messages with error details", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("test error");
    logger.error("something failed", "auth", {}, error);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0]).toContain("[ERROR]");
    expect(spy.mock.calls[0][0]).toContain("test error");
  });

  it("includes data in log output", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    logger.info("test", "ctx", { userId: "123", email: "test@test.com" });
    expect(spy.mock.calls[0][0]).toContain('"userId":"123"');
  });

  it("includes timestamp in log output", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    logger.info("test");
    // ISO timestamp format
    expect(spy.mock.calls[0][0]).toMatch(/\d{4}-\d{2}-\d{2}T/);
  });
});
