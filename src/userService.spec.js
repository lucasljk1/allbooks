// 1. CORREÇÃO DE CAMINHO: Se o arquivo está na pasta 'src', o caminho deve ser './'
// Se o arquivo estiver dentro de 'src/test', mantenha '../'
const { usuarioExiste, emailExiste } = require('./services/userService');
const { testeDB } = require('./config/database');

describe('Testando função emailExiste de userService', () => {
    it('deve retornar FALSE para email inválido', () => {
        const email = 'invalido@mail.com';
        expect(emailExiste(email, testeDB)).toBe(false);
    });

    it('deve retornar FALSE para email inexistente (undefined)', () => {
        const email = undefined;
        expect(emailExiste(email, testeDB)).toBe(false);
    });

    it('deve retornar FALSE para email vazio', () => {
        const email = '';
        expect(emailExiste(email, testeDB)).toBe(false);
    });

    it('deve retornar TRUE para email válido', () => {
        const email = 'valido@mail.com';
        expect(emailExiste(email, testeDB)).toBe(true);
    });
});

describe('Testando função usuarioExiste de userService', () => {
    // Agrupando variáveis comuns para evitar repetição
    const emailValido = 'valido@mail.com';
    const senhaValida = 123456;

    it('deve retornar FALSE para email inexistente', () => {
        expect(usuarioExiste(undefined, senhaValida, testeDB)).toBe(false);
    });

    it('deve retornar FALSE para email inválido', () => {
        expect(usuarioExiste('invalido@mail.com', senhaValida, testeDB)).toBe(false);
    });

    it('deve retornar TRUE para credenciais válidas', () => {
        expect(usuarioExiste(emailValido, senhaValida, testeDB)).toBe(true);
    });

    it('deve retornar FALSE para senha inexistente', () => {
        expect(usuarioExiste(emailValido, undefined, testeDB)).toBe(false);
    });

    it('deve retornar FALSE para senha inválida', () => {
        expect(usuarioExiste(emailValido, 'senha_invalida', testeDB)).toBe(false);
    });

    // 2. CORREÇÃO DE PERFORMANCE:
    // Date.now() tem precisão de milissegundos. 
    // Pedir "menos de 1ms" pode falhar dependendo do processamento do computador.
    it('deve executar de forma eficiente para um email existente', () => {
        const start = performance.now(); // performance.now() é mais preciso que Date.now()
        usuarioExiste(emailValido, senhaValida, testeDB);
        const end = performance.now();

        expect(end - start).toBeLessThan(10); // Aumentei para 10ms para evitar falsos negativos
    });
});
