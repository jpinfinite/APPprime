// ATENÇÃO: ESTA É A VERSÃO FINAL COM AS EXTENSÕES (.png), PREÇOS, SERVIÇOS
// E A INTEGRAÇÃO COM O SEU WHATSAPP.
const servicesData = [
    { 
        id: 1, 
        name: 'Lavagem Detalhada (Carro)', 
        desc: 'Limpeza profunda externa, descontaminação da pintura, atenção especial às rodas e cera UV.', 
        price: 'R$ 45,00',
        image: 'assets/carrosel-prime_01.png'
    },
    { 
        id: 2, 
        name: 'Lavagem Detalhada (Moto)', 
        desc: 'Limpeza profunda da moto, acessando partes não detalhadas numa ducha simples.', 
        price: 'R$ 50,00', 
        image: 'assets/carrosel-prime_02.png'
    },
    { 
        id: 3, 
        name: 'Limpeza Detalhada (Interna)', 
        desc: 'Limpeza minuciosa do interior, com produtos de alta qualidade para remover sujeiras pesadas.', 
        price: 'R$ 60,00',
        image: 'assets/carrosel-prime_03.png'
    },
    { 
        id: 4, 
        name: 'Limpeza de Motor', 
        desc: 'Proporciona durabilidade às engrenagens, bom fluxo do motor e proteção de 6 meses no verniz.', 
        price: 'R$ 50,00', // VALOR FINAL
        image: 'assets/carrosel-prime_04.png'
    },
    { 
        id: 5, 
        name: 'Higienização Completa', 
        desc: 'Proporciona um ambiente agradável, elimina bactérias e deixa o carro cheiroso.', 
        price: 'R$ 300,00',
        image: 'assets/carrosel-prime_05.png'
    },
    {
        id: 6,
        name: 'Ducha Moto',
        desc: 'Lavagem externa para motos.',
        price: 'R$ 20,00',
        image: 'assets/MOTO.png'
    },
    // GERAL MOTO REMOVIDO
    {
        id: 8,
        name: 'Ducha Carro',
        desc: 'Lavagem externa para carros.',
        price: 'R$ 18,00',
        image: 'assets/carro prime.png'
    },
    {
        id: 9,
        name: 'Geral Carro',
        desc: 'Lavagem completa para carros.',
        price: 'R$ 35,00',
        image: 'assets/carro prime.png'
    }
];

const servicesList = document.getElementById('servicesList');
const selectedName = document.getElementById('selectedName');
const selectedPrice = document.getElementById('selectedPrice');
const bookBtn = document.getElementById('bookBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const formServiceName = document.getElementById('formServiceName');
const formServiceImage = document.getElementById('formServiceImage'); 
let selectedService = null;

function renderServices(){
    servicesList.innerHTML = '';
    servicesData.forEach(s=>{
        const card = document.createElement('div');
        card.className='service-card';
        card.innerHTML = `
            <div class="service-title">${s.name}</div>
            <div class="service-desc">${s.desc}</div>
            <div class="price">${s.price}</div>`;
        card.onclick=(event)=>selectService(s, event); 
        servicesList.appendChild(card);
    });
}

function selectService(s, event){
    // Remove a classe 'selected' de todos os cartões
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('selected'));

    selectedService = s;
    selectedName.textContent = s.name;
    selectedPrice.textContent = s.price;
    bookBtn.disabled = false;

    // Adiciona a classe 'selected' ao cartão clicado
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('selected');
    }
}

// Função de fechamento do modal unificada
const closeModal = () => {
    modalBackdrop.style.display = "none";
    formServiceImage.style.display = 'none'; // Esconde a imagem ao fechar
    formServiceImage.src = ''; // Limpa a src
};

bookBtn.onclick=()=>{
    if(!selectedService) return;
    formServiceName.textContent = selectedService.name + " · " + selectedService.price;
    
    // Carrega a imagem no modal
    if (selectedService.image) {
        formServiceImage.src = selectedService.image;
        formServiceImage.style.display = 'block'; // Mostra a imagem
    } else {
        formServiceImage.style.display = 'none'; // Esconde se não houver imagem
    }

    modalBackdrop.style.display="flex";
};

document.getElementById('closeModal').onclick = closeModal;
document.getElementById('cancelBtn').onclick = closeModal;

document.getElementById('bookingForm').onsubmit = (e) => {
    e.preventDefault();

    // SEU NÚMERO DE WHATSAPP FINAL (21 99775-9751)
    const whatsappNumber = '5521997759751'; 

    const clientName = document.getElementById('clientName').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const vehicleType = document.getElementById('vehicleType').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Formata a data e hora para um formato mais legível
    const formattedDate = new Date(date).toLocaleDateString('pt-BR');

    // 1. Cria o texto da mensagem
    let message = `*✅ NOVO AGENDAMENTO PRIME!*`;
    message += `\n\n*Serviço:* ${selectedService.name} (${selectedService.price})`;
    message += `\n*Cliente:* ${clientName}`;
    message += `\n*Telefone:* ${clientPhone}`;
    message += `\n*Veículo:* ${vehicleType}`;
    message += `\n*Data e Hora:* ${formattedDate} às ${time}`;
    message += `\n\n_Aguardo confirmação!_`;


    // 2. Codifica a mensagem para a URL
    const encodedMessage = encodeURIComponent(message);

    // 3. Cria o link de WhatsApp (usando a API oficial)
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // 4. Abre o link (redireciona o usuário para o WhatsApp)
    window.open(whatsappLink, '_blank');

    closeModal(); // Fecha o modal após a tentativa de envio

    // Limpa a seleção e campos do formulário
    selectedService = null;
    document.getElementById('selectedName').textContent = 'Nenhum';
    document.getElementById('selectedPrice').textContent = '—';
    document.getElementById('bookBtn').disabled = true;
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('selected'));
    document.getElementById('bookingForm').reset();
};

// Inicia o carregamento dos serviços ao carregar a página
renderServices();