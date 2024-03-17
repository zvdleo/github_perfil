import { useEffect, useState } from "react";
import styles from './ReposList.module.css'

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [deuErro, setDeuError] = useState(false); 

    useEffect(() => {
        setEstaCarregando(true);
        setDeuError(false);

        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Usuário não encontrado. Por favor, tente novamente.");
                }
                return res.json();
            })
            .then(resJson => {
                setTimeout(() => {
                    setEstaCarregando(false);
                    setRepos(resJson);
                }, 3000);
            })
            .catch(error => {
                setEstaCarregando(false);
                setDeuError(true);
                console.error("Erro ao buscar repositórios:", error);
            });
    }, [nomeUsuario]);

    return (
        <div className="container">
            {estaCarregando ? (
                <h1>Carregando...</h1>
            ) : (
                <div>
                    {deuErro ? (
                        <h2>Não foi possível encontrar esse usuário. Por favor, tente novamente.</h2>
                    ) : (
                        <ul className={styles.list}>
                            {repos.map(({ id, name, language, html_url }) => (
                                <li className={styles.listItem} key={id}>
                                    <div className={styles.itemName}>
                                        <b>Nome:</b>
                                        {name}
                                    </div>
                                    <div className={styles.itemLanguage}>
                                        <b>Linguagem:</b>
                                        {language}
                                    </div>
                                    <a className={styles.itemLink} target="_blank" rel="noopener noreferrer" href={html_url}>Visitar no Github</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default ReposList;
