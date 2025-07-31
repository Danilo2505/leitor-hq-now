# leitor-hq-now

## Pendências

- [x] Ajustar CSS para Mobile
- [ ] Talvez adicionar modo de scroll lateral nas páginas duplas (width 200%), quando estiva no modo de leitura de página única
- [ ] Talvez colocar animações
- [ ] Adicionar lupa
  - [] https://codepen.io/code-tomato/pen/XWvWXWx
- [ ] Página Home
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

- https://dev.to/sucodelarangela/construindo-uma-modal-semantica-com-o-elemento-1j88
- https://dev.to/wizdomtek/mastering-dom-manipulation-10-essential-tips-for-efficient-and-high-performance-web-development-3mke#10-use-addeventlistener-options-for-better-controlxWTEI908
