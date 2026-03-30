export function truncateString(str?: string, length = 8) {
  return str ? `${str.slice(0, length)}...` : "";
}

export function formatDocument(value?: string | number): string {
  if (!value) return "";

  const digits = String(value).replace(/\D/g, "");

  // CPF
  if (digits.length <= 11) {
    return digits
      .slice(0, 11)
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }

  // CNPJ
  return digits
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

export function getInitialChar(value?: string) {
  return (
    value
      ?.split(" ")
      .map((word) => word.slice(0, 1))
      .join("") || null
  );
}

export function formatFrequencyFreeTrial(frequency?: number, frequencyType?: string) {
  if (!frequency || !frequencyType) return null;
  if (frequency <= 0) return "Inválido";

  const units = {
    days: frequency === 1 ? "dia" : "dias",
    months: frequency === 1 ? "mês" : "meses",
  };

  return `${frequency} ${units[frequencyType]}`;
}

export function formatFrequency(frequency_type?: string, frequency: number = 1) {
  if (frequency === 1) {
    return frequency_type === "months" ? "Mensal" : "Diário";
  }

  return `${frequency} ${frequency_type === "months" ? "meses" : "dias"}`;
}

export function getColorFromName(name?: string) {
  const colors = [
    "bg-purple-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-pink-600",
    "bg-indigo-600",
    "bg-orange-600",
    "bg-teal-600",
  ];

  const index = (name?.charCodeAt(0) ?? 0) % colors.length;
  return colors[index];
}
