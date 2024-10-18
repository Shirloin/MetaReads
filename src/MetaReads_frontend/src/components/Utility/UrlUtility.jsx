const checkCanisterId = () => {
  const baseUrl = window.location.href; // Use href to get the full URL
  const url = new URL(baseUrl);
  const urlCanisterId = url.searchParams.get("canisterId");
  const storedCanisterId = sessionStorage.getItem("canisterId");
  if (storedCanisterId) {
    return storedCanisterId;
  }
  if (urlCanisterId) {
    sessionStorage.setItem("canisterId", urlCanisterId);
    return urlCanisterId; // Return the canister ID from URL
  } else {
    return null;
  }
};

export const createUrl = (path) => {
  const canisterId = checkCanisterId();
  if (canisterId) {
    return `${path}/?canisterId=${canisterId}`;
  } else {
    return path;
  }
};
