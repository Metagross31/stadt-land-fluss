import './App.css';
import { ThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import { AppTheme, AppThemes } from './constants/themes.constant';
import { Dashboard } from './containers/Dashboard/Dashboard';
import GameResults from './containers/GameResults/GameResults';
import JoinGame from './containers/JoinGame/JoinGame';
import NewGame from './containers/NewGame/NewGame';
import PlayGame from './containers/PlayGame/PlayGame';
import { getAppThemeIdFromLocalStorage, setAppThemeIdInLocalStorage } from './utils/local-storage.utils';

interface AppState {
    activeTheme: AppTheme;
}

class App extends Component<any, AppState> {
    public state: AppState = {
        activeTheme: AppThemes[0],
    };

    public render() {
        return (
            <ThemeProvider theme={this.state.activeTheme.muiTheme}>
                <div className="app-container">
                    <Header
                        theme={this.state.activeTheme}
                        switchTheme={this.switchThemeHandler}
                    />
                    <main className={'app-main ' + this.state.activeTheme.className}>
                        <HashRouter basename={process.env.PUBLIC_URL}>
                            <Switch>
                                <Route path="/" exact component={Dashboard} />
                                <Route path="/newgame" exact component={NewGame} />
                                <Route path="/joingame" exact component={JoinGame} />
                                <Route path="/play" exact component={PlayGame} />
                                <Route path="/results" exact component={GameResults} />
                            </Switch>
                        </HashRouter>
                    </main>
                </div>
            </ThemeProvider>
        );
    }

    public componentDidMount() {
        const appThemeId = getAppThemeIdFromLocalStorage();
        if (appThemeId) {
            const appTheme = AppThemes.find(theme => theme.id === appThemeId);
            if (appTheme) {
                this.setState({ activeTheme: appTheme });
            }
        }
    }

    private switchThemeHandler = (newTheme: AppTheme) => {
        this.setState({ activeTheme: newTheme });
        setAppThemeIdInLocalStorage(newTheme.id);
    }
}

export default App;
