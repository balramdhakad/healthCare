export const formatAddress = (address) => {
  if (!address) return "Address details missing.";

  const parts = [];

  if (address.fullname) parts.push(address.fullname);
  if (address.address_line1) parts.push(address.address_line1);
  if (address.address_line2) parts.push(address.address_line2);
  if (address.city || address.state || address.zip_code)
    parts.push(
      [address.city, address.state, address.zip_code].filter(Boolean).join(", ")
    );
  if (address.country) parts.push(address.country);
  if (address.phone_number)
    parts.push(`Phone: ${address.phone_number} (${address.address_type})`);

  return parts.join(", ");
};

export const getAddressDisplayString = (address) => {
  if (!address) return "Select an address";
  const line1 = address.address_line1 || "";
  const cityState = [address.city, address.state].filter(Boolean).join(", ");
  const type = address.address_type ? `(${address.address_type})` : "";
  return `${line1}, ${cityState} ${type}`;
};
