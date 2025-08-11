import SiteBackground from "../../components/SiteBackground";
import "../../styles/enhance.css";
import './locale.css'; import Navbar from '../../components/Navbar'; import { ThemeProvider } from '../../components/ThemeProvider'; export default function LocaleLayout({children,params}){const {locale}=params; return(<ThemeProvider><Navbar locale={locale}/>
        <SiteBackground />
      <div className="h-2 sm:h-0" /><main>{children}</main></ThemeProvider>);}