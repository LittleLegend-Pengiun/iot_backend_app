import CardStyles from '../../styles/light/Card.module.css'
import ControlStyles from '../../styles/light/Control.module.css'
import ControlContentStyles from '../../styles/light/ControlContent.module.css'
import CurrentStateStyles from '../../styles/light/Current-state.module.css'
import CurrentStateContentStyles from '../../styles/light/CurrentStateContent.module.css'
import DrawerStyles from '../../styles/light/Drawer.module.css'
import LayoutStyles from '../../styles/light/layout.module.css'
import LoginStyles from '../../styles/light/Login.module.css'
import SettingStyles from '../../styles/light/Setting.module.css'
import StatisticStyles from '../../styles/light/Statistic.module.css'
import StatisticContentStyles from '../../styles/light/StatisticContent.module.css'
import adminStyles from '../../styles/light/Admin.module.css'

export default function () {
  return {
    card: CardStyles,
    control: ControlStyles,
    controlContent: ControlContentStyles,
    currentState: CurrentStateStyles,
    currentStateContent: CurrentStateContentStyles,
    drawer: DrawerStyles,
    layout: LayoutStyles,
    login: LoginStyles,
    setting: SettingStyles,
    statistic: StatisticStyles,
    statisticContent: StatisticContentStyles,
    admin: adminStyles
  }
}