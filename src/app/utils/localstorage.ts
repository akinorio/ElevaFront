export class LocalStorageUtils {
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('evolpe.user'));
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('evolpe.token');
        localStorage.removeItem('evolpe.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('evolpe.token');
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('evolpe.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('evolpe.user', JSON.stringify(user));
    }

}