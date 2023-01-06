import Card from "../components/Card"
import Layout from "../layout/layout"
import { useDispatch, useSelector } from "react-redux";
import { changeToVi, changeToEng, changeToFr, changeToGer, changeToSpan } from "../feature/languageSlice";
import { changeToLi, changeToDar } from "../feature/themeSlice";
import { useEffect } from "react";
import Link from "next/link";

export default function Error() {

    const Lang = useSelector(state => state.language);
    const Styles = (useSelector(state => state.theme)).value().setting;
    const dispatch = useDispatch();

    const changLangHandler = e => {
        let lang = document.getElementById("lang");
        localStorage.setItem('language', `${lang.value}`);
        changeLang(lang.value);
    }
    const changeLang = (lang) => {
        switch (lang) {
            case "vi":
                dispatch(changeToVi())
                break
            case "eng":
                dispatch(changeToEng())
                break
            case "fr":
                dispatch(changeToFr())
                break
            case "ger":
                dispatch(changeToGer())
                break
            case "span":
                dispatch(changeToSpan())
                break
        }
    }

    const changeThemeHandler = () => {
        console.log("change theme")
        let theme = document.getElementById("switch1");
        changeDmode(theme.checked);
    }
    const changeDmode = (isDark) => {
        if (isDark) dispatch(changeToDar())
        else dispatch(changeToLi())
    }

    useEffect(() => {
        const iniLanguage = localStorage.getItem('language');
        changeLang(iniLanguage);
        const selectedOption = document.getElementById(iniLanguage);
        if (selectedOption != null) { selectedOption.setAttribute("selected", "") };
    }, [])

    return (<div className={Styles.page}>
        <div className={Styles.card}>
            <Card title={Error}>

                <div className={Styles.container}>
                    <div className={Styles.item}>

                        <h1 style={{ color: "red" }}>You are not Page Administrator!!!</h1>
                        <a href="/setting">
                            Back to user page!
                        </a>

                    </div>
                </div>
            </Card>
        </div>
    </div>
    )
}


Error.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}