{pkgs} : {
  deps = [
    pkgs.chromium
    pkgs.playwright
    pkgs.playwright-driver
    pkgs.gitFull
  ];
  env = {
    PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers}";
    PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = true;
  };
}