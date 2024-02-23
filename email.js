const enviarEmail = (addressee, subject, body) => {
    if (!addressee) {
        return {
            status: "Error",
            message: "Um destinatário precisa ser fornecido ao enviar um e-mail.",
        };
    }

    if (!subject) {
        return {
            status: "Error",
            message:
                "O campo de assunto não deveria estar vazio ao enviar um e-mail.",
        };
    }

    if (!body) {
        return {
            status: "Error",
            message:
                "O corpo da mensagem precisa ser fornecido ao enviar um e-mail.",
        };
    }

    console.log(`
        De: news@carstore.com
        Para: ${addressee}
        Assunto: ${subject}
        
        ${body}
    `);

    return { status: "Sucess", message: "E-mail enviado com sucesso!" };
};

const getWeekday = () => {
    // const date = new Date();
    // return date.getDay(); 
    return 1;
};

const montarCorpoEmail = (
    novosVeiculos,
    maisVendidos,
    condicoesAquisicao
) => {
    return `
      Olá,
  
      Confira as novidades da CarStore esta semana:
  
      Novos Veículos:
      - ${novosVeiculos.join("\n- ")}
  
      Mais Vendidos:
      - ${maisVendidos.join("\n- ")}
  
      Condições para Aquisição:
      ${condicoesAquisicao}
  
      Atenciosamente,
      Equipe CarStore
    `;
};

const enviarEmailsClientes = (
    listaEmails,
    novosVeiculos,
    maisVendidos,
    condicoesAquisicao
) => {
    listaEmails.forEach((cliente) => {
        if (cliente.receberMarketing) {
            const corpoEmail = montarCorpoEmail(
                novosVeiculos,
                maisVendidos,
                condicoesAquisicao
            );
            const resultadoEnvio = enviarEmail(
                cliente.email,
                "Novidades da CarStore",
                corpoEmail
            );
            if (resultadoEnvio.status === "Error") {
                console.log(
                    `Erro ao enviar e-mail para ${cliente.email}: ${resultadoEnvio.message}`
                );
            } else {
                console.log(`E-mail enviado para ${cliente.email}`);
            }
        }
    });
};

const listaClientes = [
    { email: "cliente1@example.com", receberMarketing: true },
    { email: "cliente2@example.com", receberMarketing: false },
    { email: "cliente3@example.com", receberMarketing: true },
];
const novosVeiculos = ["Modelo A", "Modelo B", "Modelo C"];
const maisVendidos = ["Modelo D", "Modelo E", "Modelo F"];
const condicoesAquisicao =
    "Condições especiais de financiamento esta semana!";

if (getWeekday() === 1) {
    enviarEmailsClientes(
        listaClientes,
        novosVeiculos,
        maisVendidos,
        condicoesAquisicao
    );
} else {
    console.log(
        "Hoje não é segunda-feira. Os e-mails serão enviados apenas às segundas-feiras."
    );
}
