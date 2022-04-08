/* tslint:disable */
export const faqsData = [
  {
    titulo: `O que significam as comparações de preço do Tá de Pé?`,
    texto: `<p>As comparações têm por objetivo mostrar se a gestão realizou uma compra relativamente econômica ou não. Há dois indicadores de comparação de preço: com compras recentes e com o valor estimado.</p>`,
  },
  {
    titulo: `O que indica a \"diferença com compras recentes\" na tabela de itens contratados?`,
    texto: `<p>A \"diferença com compras recentes é uma comparação entre o preço do produto selecionado e a mediana de preços para compras recentes do mesmo produto. É um indicador se o poder público economizou ou desperdiçou recursos, tendo em vista o que foi estabelecido em outros contratos. Os produtos são categorizados segundo a descrição fornecida pelo órgão público no contrato e agrupadas automaticamente por meio de um algoritmo de machine learning.</p>
    <p>Em seguida, a mediana de cada categoria é calculada e usada como base para comparação de cada compra. Esse cálculo é restrito a compras feitas na mesma unidade federativa e apenas para compras seis meses antes ou depois da data. Assim, compras do governo federal são apenas comparáveis entre si, assim como compras de um município de Pernambuco terá uma mediana construída a partir apenas de produtos comprados apenas no estado. É possível verificar quais itens foram usados como comparação clicando no produto na página do contrato.</p>`,
  },
  {
    titulo: `O que indica a \"diferença com estimado\" na tabela de itens contratados?`,
    texto: `<p>Trata-se de uma comparação entre valor estimado e contratado, sendo assim um outro indicador de economia. Na abertura do edital de licitação a prefeitura aponta um valor de referência que está sendo pago pelo mercado, o valor estimado. O índice revela a diferença entre quanto se esperava gastar e quanto efetivamente se gastou com determinado produto. Como é possível que esse valor esteja superestimado pelo poder público, a comparação deste índice com o de valores pagos no estado oferece uma análise conjunta mais robusta.</p>`,
  },
  {
    titulo: `Como a Transparência Brasil encontra estes dados?`,
    texto: `<p>Todos os dados usados pelo Tá de Pé são dados públicos de fontes oficiais.</p>
    <p>Para os municípios de Pernambuco e Rio Grande do Sul, são utilizados os dados abertos dos respectivos Tribunais de Contas de cada estado. As informações são processadas com auxílio do código aberto disponível nos endereços: <a href="https://github.com/analytics-ufcg/ta-de-pe-dados target="_blank">https://github.com/analytics-ufcg/ta-de-pe-dados</a> e <a href="https://github.com/analytics-ufcg/ta-de-pe target="_blank">https://github.com/analytics-ufcg/ta-de-pe</a>.</p>
    <p>Para obter informações sobre os fornecedores, utilizamos os dados abertos de sócios das pessoas jurídicas fornecidos pela Receita Federal bem como do Cadastro de Empresas Inidôneas e Suspensas disponibilizado pela CGU.</p>
    <p>Caso encontre alguma inconsistência nas informações, por favor entre em contato por e-mail no endereço <a href="mailto:tadepe@transparencia.org.br" target="_blank">tadepe@transparencia.org.br</a>.</p>`,
  },
  {
    titulo: `Não encontro o meu município no site Tá de Pé, o que devo fazer?`,
    texto: `<p>Nesta primeira fase do projeto, estamos divulgando apenas os contratos, licitações e empenhos dos municípios do Rio Grande do Sul e Pernambuco. Atualmente, apenas estes dois entes disponibilizam dados com boa qualidade, especificamente o preço por item contratado, que permite realizar análises comparativas essenciais para o funcionamento do Tá de Pé.</p>
    <p>Infelizmente, esta não é a realidade dos dados de contratação publicados pelos demais estados. Ainda assim apresentaremos em breve análises com dados de outros estados. Precisaremos do apoio de indivíduos para abrir essas informações. Se você tem interesse em ajudar para que possamos oferecer a análise, entre em contato por e-mail no endereço <a href="mailto:tadepe@transparencia.org.br" target="_blank">tadepe@transparencia.org.br</a>, informando seu município e estado.</p>`,  },
  {
    titulo: `O que é a Malha Fina da Transparência Brasil?`,
    texto: `<p>A Malha Fina é uma seleção de contratos em que detectamos algo incomum. A Malha Fina facilita a identificação de compras públicas atípicas, mas não é capaz de indicar, por si só, irregularidades, cabendo ao cidadão explorar o contexto das informações fornecidas.</p>
    <p>Atualmente, 4 tipos de inconsistências são detectadas pela Malha Fina:</p>
    <ul>
    <li>Quando o contrato entre o poder público e o fornecedor é assinado menos de 6 meses depois da criação do registro do fornecedor na receita federal.</li>
    <li>Quando o produto é vendido por uma empresa com atividade econômica pouco comum. Para esse alerta, são analisadas as atividades econômicas declaradas pela empresa na receita federal de todos os fornecedores daquele tipo de produto e similares. Se a atividade da empresa em questão for incomum, é gerado um alerta.</li>
    <li>Quando o contrato de fornecimento é assinado com uma empresa sancionada ou condenada. Com base no Cadastro de Empresas Inidôneas e Suspensas, verificamos se a empresa fornecedora estava sancionada na época da assinatura do contrato. Caso positivo, é gerado um alerta.</li>
    <li>Valor contratado acima do faturamento legal permitido à categoria econômica do fornecedor. Nesse caso, é analisado o porte econômico registrado pelo fornecedor junto à Receita Federal. Microempresas possuem faturamento permitido de até R$ 360 mil no ano, enquanto empresas de pequeno porte possuem um limite de R$ 4,8 milhões. Contratos acima dos respectivos limites com fornecedores registrados como micro ou pequenas empresas geram alertas. Cabe notar que a empresa não estará necessariamente incorrendo em uma ilegalidade, visto que o porte pode ser alterado posteriormente no ano seguinte. Entretanto, trata-se de um comportamento empresarial atípico.</li>
    </ul>`,
  },
];
