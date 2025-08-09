# leitor-hq-now

## Pendências

- [x] Ajustar CSS para Mobile

- [ ] Criar um arquivo .js para intermediar o front-end e back-end

- [ ] Consertar bugs
  - [ ] Na página do leitor, ajustar o scroll para quando mudar o tipo de vizualização (página única ou dupla)
  - [ ] Implementar o modal de confugurações
    - [ ] Switch para desativar animações
  - [x] Na página inicial
    - [x] Bugs de responsividade
    - [x] Reiniciar a contagem de tempo do scroll automático quando o usuário mudar o card das últimas HQs lidas
      - [x] Normalmente, fazer o scroll automático a cada 10 segundos
      - [x] Quando o usuário interagir, pausar o timer
      - [x] Quando o mouse sair, continuar o timer
      - [x] Quando o usuário clicar para mduar de página, reiniciar o timer
    - [x] Desativar os botões de navegação das HQs por categoria quando não tiverem efeito
    - [x] Resolver o problema dos últimos cards das HQs por categoria estarem sendo cortados

- [ ] Criar um menu de configurações simples onde dá par escolher usar ou não animações

- [ ] Talvez adicionar modo de scroll lateral nas páginas duplas (width 200%), quando estiva no modo de leitura de página única

- [ ] Adicionar lupa

  - [] https://codepen.io/code-tomato/pen/XWvWXWx

- [x] Página Home
  - [x] Design inicial (tipo da Netflix)
    - Tentar fazer primeiro o design mobile, mas o para desktop seria:
    - [x] Ao fundo, um slider automático
      - [x] Mostrando os 5 últimos capítulos de HQs lidas pelo usuário e suas informações
    - [x] Várias sections horizontais preenchidas com cards das HQs guardadas das editoras
    - [x] Ao passar o mouse sobre o card mostra seu título sobre o inferior dele
    - [ ] Ao clicar no card se abre uma tela com a capa à esquerda e à direita o título, descrição, editora e status
  - [ ] Criar uma home com todas as HQs do usuário (basicamente, um CRUD)
    - [ ] Mostrar uma capa com cada HQ
    - [ ] Permitir selecionar uma HQ e escolher o capítulo
      - [ ] Se o capítulo estiver no localStorage (limite de \~10 capítulos), carrega de lá
      - [ ] Se não, chama a API, armazena no localStorage e carrega
      - [ ] Armazena o índice da HQ e o índice do capítulo aberto
      - [ ] Redireciona para a página do leitor e carrega as páginas
  - [ ] Criar página para gerenciar HQs
    - [ ] Armazenar todas as HQs
    - [ ] Adicionar HQs no final da lista
    - [ ] Apagar HQ e atualizar os índices (inclusive o índice da HQ atual, se necessário)
    - [ ] Ordenar HQs manualmente
    - [ ] Editar dados da HQ (nome, capa, descrição, etc)
  - [ ] Criar leitor de capítulos
    - [ ] Carregar as páginas do capítulo atual (do localStorage ou API)
    - [ ] Exibir as páginas sequencialmente
    - [ ] Permitir voltar para seleção de capítulos ou HQs
  - [ ] Usar localStorage para:
    - [ ] Guardar o índice da HQ atual
    - [ ] Guardar o índice do capítulo atual
    - [ ] Guardar até 10 capítulos em cache (remover o mais antigo ao ultrapassar o limite)

## Algumas referências

- https://www.youtube.com/watch?v=dIUOWdwwZBw
- https://dev.to/sucodelarangela/construindo-uma-modal-semantica-com-o-elemento-1j88
- https://dev.to/wizdomtek/mastering-dom-manipulation-10-essential-tips-for-efficient-and-high-performance-web-development-3mke#10-use-addeventlistener-options-for-better-controlxWTEI908
