// mpErrorTranslate.ts
export const errorMap: Record<string, string> = {
    accredited: "Pagamento creditado.",
    partially_refunded: "Pagamento parcialmente reembolsado.",
    pending_capture: "Pagamento autorizado aguardando captura.",
    offline_process: "Pagamento em processamento offline.",
    pending_contingency: "Falha temporária. Processamento diferido.",
    pending_review_manual: "Pagamento em revisão manual.",
    deferred_retry: "Pagamento agendado para nova tentativa.",
    pending_waiting_transfer: "Aguardando finalização da transferência bancária.",
    pending_waiting_payment: "Aguardando realização do pagamento.",
    pending_challenge: "Confirmação pendente (3DS Challenge).",

    bank_error: "Pagamento rejeitado por erro bancário.",
    cc_rejected_3ds_mandatory: "Pagamento rejeitado por falta de autenticação 3DS obrigatória.",
    cc_rejected_bad_filled_card_number: "Número do cartão inválido.",
    cc_rejected_bad_filled_date: "Data de validade inválida.",
    cc_rejected_bad_filled_other: "Dados do cartão preenchidos incorretamente.",
    cc_rejected_bad_filled_security_code: "Código de segurança (CVV) inválido.",
    cc_rejected_blacklist: "Cartão bloqueado ou listado por fraude.",
    cc_rejected_call_for_authorize: "Necessária autorização junto ao banco emissor.",
    cc_rejected_card_disabled: "Cartão desativado.",
    cc_rejected_duplicated_payment: "Pagamento duplicado.",
    cc_rejected_high_risk: "Transação recusada por alto risco.",
    cc_rejected_insufficient_amount: "Limite insuficiente no cartão.",
    cc_rejected_invalid_installments: "Número de parcelas inválido.",
    cc_rejected_max_attempts: "Número máximo de tentativas excedido.",
    cc_rejected_other_reason: "Pagamento recusado por motivo não especificado.",
    cc_rejected_time_out: "Transação recusada por tempo excedido.",
    cc_amount_rate_limit_exceeded: "Limite máximo permitido do meio de pagamento excedido.",

    rejected_high_risk: "Rejeitado por avaliação de risco ou suspeita de fraude.",
    rejected_insufficient_data: "Rejeitado por falta de informações obrigatórias.",
    rejected_by_bank: "Operação recusada pelo banco.",
    rejected_by_regulations: "Pagamento recusado por regulamentação.",
    rejected_by_biz_rule: "Pagamento recusado por regra de negócio.",

    authorized: "Pagamento autorizado (não capturado).",
    cancelled: "Pagamento cancelado.",
    refunded: "Pagamento reembolsado.",
    in_mediation: "Pagamento em disputa.",
};

export const stylesStatus = {
    approved: "bg-green-900/40 text-green-400 border-green-500/30",

    pending: "bg-yellow-900/40 text-yellow-400 border-yellow-500/30",
    in_process: "bg-blue-900/40 text-blue-400 border-blue-500/30",
    authorized: "bg-indigo-900/40 text-indigo-400 border-indigo-500/30",

    rejected: "bg-red-900/40 text-red-400 border-red-500/30",
    charged_back: "bg-red-950/50 text-red-500 border-red-700/40",

    cancelled: "bg-orange-900/40 text-orange-400 border-orange-500/30",

    refunded: "bg-gray-700/40 text-gray-400 border-gray-500/30",

    in_mediation: "bg-purple-900/40 text-purple-400 border-purple-500/30",
} as const;

export const labels: Record<keyof typeof stylesStatus, string> = {
  approved: "Aprovado",
  pending: "Pendente",
  in_process: "Em análise",
  authorized: "Autorizado",

  rejected: "Rejeitado",
  charged_back: "Chargeback",

  refunded: "Estornado",
  cancelled: "Cancelado",

  in_mediation: "Em disputa",
};

export const payment_methods_id = {
    pix: "PIX",
    master: "Cartão",
    boleto: "Boleto"
}