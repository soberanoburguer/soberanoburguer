export interface UnidadeInfo {
  id: "santa-rita" | "joao-pessoa";
  nome: string;
  cidade: string;
  bairro: string;
  sigla: string; // Ex: "SR" ou "JP"
  slug: string;
  endereco: string;
  cep: string;
  telefone: string;
  whatsappLink: string;
  cardapioLink: string;
  mapsLink: string;
  horario: string;
  tempoEspera: string;
  instagramLink: string;
  deliveryInfo: string; // Ex: "Delivery para toda Santa Rita e Bayeux"
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const UNIDADES: Record<string, UnidadeInfo> = {
  "santa-rita": {
    id: "santa-rita",
    nome: "Soberano Burguer - Santa Rita",
    cidade: "Santa Rita",
    bairro: "Tibiri II",
    sigla: "SR",
    slug: "santa-rita",
    endereco: "R. Emb. Milton Cabral, 456 - Tibiri II, Santa Rita - PB",
    cep: "58302-510",
    telefone: "(83) 98625-6727",
    whatsappLink: "https://wa.me/5583986256727",
    cardapioLink: "https://app.cardapioweb.com/soberano_burguer",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=R.+Emb.+Milton+Cabral,+456,+Tibiri+II,+Santa+Rita,+PB,+58302-510",
    horario: "Segunda a Domingo · 17h30 às 00h",
    tempoEspera: "30-45 min",
    instagramLink: "https://instagram.com/soberano_burguer",
    deliveryInfo: "Delivery em toda Santa Rita e Bayeux",
    seo: {
      title: "Soberano Burguer Santa Rita | O Reinado do Sabor em Tibiri II",
      description: "Blends artesanais de alta qualidade feitos por quem entende de carne. O melhor hambúrguer artesanal de Santa Rita, PB (Tibiri II). Peça seu delivery!",
      keywords: ["hambúrguer artesanal Santa Rita", "delivery Tibiri II", "soberano burguer santa rita", "hambúrguer Tibiri", "melhor hambúrguer", "delivery de burguer"],
    }
  },
  "joao-pessoa": {
    id: "joao-pessoa",
    nome: "Soberano Burguer - João Pessoa",
    cidade: "João Pessoa",
    bairro: "Costa e Silva",
    sigla: "JP",
    slug: "joao-pessoa",
    endereco: "R. Profa. Adelaíde Figueiredo Gouvêia, 220-268 - Costa e Silva, João Pessoa - PB",
    cep: "58081-230",
    telefone: "(83) 99601-4989",
    whatsappLink: "https://wa.me/5583996014989",
    cardapioLink: "https://soberano-burguer.rmenu.com.br",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=R.+Profa.+Adelaide+Figueiredo+Gouveia,+220-268+-+Costa+e+Silva,+Joao+Pessoa+-+PB,+58081-230",
    horario: "Segunda a Domingo · 17h30 às 00h",
    tempoEspera: "30-45 min",
    instagramLink: "https://instagram.com/soberano_burguer",
    deliveryInfo: "Delivery para toda a região de João Pessoa",
    seo: {
      title: "Soberano Burguer João Pessoa | O Reinado do Sabor na Capital",
      description: "Saboreie nossos blends artesanais suculentos no Costa e Silva em João Pessoa, PB. Hambúrguer de verdade, criado com paixão e brasa. Peça já!",
      keywords: ["hambúrguer artesanal João Pessoa", "delivery João Pessoa", "soberano burguer joao pessoa", "hambúrguer JP", "melhor hambúrguer joao pessoa", "delivery Costa e Silva"],
    }
  }
};
