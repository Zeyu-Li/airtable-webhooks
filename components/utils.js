// This gets called on every request
export async function get(url = "") {
  // Fetch data from external API
  try {
    const res = await fetch(`${window.location.origin}/api/${url}`);
    return await res.json();
  } catch (e) {
    throw new Error("Response is not found");
  }
}
