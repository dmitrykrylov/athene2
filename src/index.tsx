require('paper/dist/paper-full');
require('./libs/paper-area-text');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, Reducer } from 'redux';

import { MathHelper, Vec2 } from '@app/core';

import * as Actions from '@app/wireframes/model/actions';

import {
    Diagram,
    EditorState,
    Serializer,
    SELECT_DIAGRAM,
    SELECT_ITEMS,
    undoable
} from '@app/wireframes/model';

import { registerRenderers } from '@app/wireframes/shapes';

const rendererService = registerRenderers();

let diagram = Diagram.createDiagram();
let index = 0;

for (let identifier in rendererService.registeredRenderers) {
    if (rendererService.registeredRenderers.hasOwnProperty(identifier)) {
        const renderer = rendererService.registeredRenderers[identifier];

        if (renderer.showInGallery()) {
            const x = 150 + Math.floor(index % 5) * 200;
            const y = 150 + Math.floor(index / 5) * 200;

            diagram = diagram.addVisual(renderer.createDefaultShape(MathHelper.guid()).transformWith(t => t.moveBy(new Vec2(x, y))));

            index++;
        }
    }
}

const reducers: Reducer<EditorState>[] = [
    Actions.alignment(),
    Actions.appearance(),
    Actions.items(rendererService, new Serializer(rendererService)),
    Actions.diagrams(),
    Actions.grouping(),
    Actions.ordering()
];

const reducer: Reducer<EditorState> = (state: EditorState, action: any) => {
    for (const nested of reducers) {
        const newState = nested(state, action);

        if (newState !== state) {
            return newState;
        }
    }

    return state;
};

const store = createStore<any>(
    combineReducers({
        editor:
            undoable(reducer,
                20,
                EditorState.createInitial()
                    .addDiagram(diagram).selectDiagram(diagram.id), [
                SELECT_DIAGRAM,
                SELECT_ITEMS
            ])
    })
);

import { App } from './App';

import './index.css';

const Root = (
    <Provider store={store}>
        <App rendererService={rendererService} />
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root') as HTMLElement);