import { Vec2 } from '@app/core';

import {
    ALIGN_H_LEFT,
    ALIGN_H_CENTER,
    ALIGN_H_RIGHT,
    ALIGN_V_TOP,
    ALIGN_V_CENTER,
    ALIGN_V_BOTTOM,
    alignment,
    alignItems,
    Diagram,
    DiagramShape,
    DISTRIBUTE_H,
    DISTRIBUTE_V,
    EditorState
} from '@app/wireframes/model';

describe('AlignmentReducer', () => {
    const reducer = alignment();
    const shape1 = DiagramShape.createShape('btn', 20, 20).transformWith(t => t.moveTo(new Vec2(100, 100)));
    const shape2 = DiagramShape.createShape('btn', 40, 40).transformWith(t => t.moveTo(new Vec2(200, 200)));
    const shape3 = DiagramShape.createShape('btn', 80, 80).transformWith(t => t.moveTo(new Vec2(300, 300)));
    const diagram =
        Diagram.empty()
            .addVisual(shape1)
            .addVisual(shape2)
            .addVisual(shape3);

    it('should return same state if action is unknown', () => {
        const state_1 = EditorState.empty();
        const state_2 = reducer(state_1, { type: 'UNKNOWN' });

        expect(state_2).toBe(state_1);
    });

    it('should return same state if action has unknown alignment type', () => {
        const state_1 = EditorState.empty();
        const state_2 = reducer(state_1, alignItems('UNKNOWN', diagram, []));

        expect(state_2).toBe(state_1);
    });

    it('should align to horizontally left', () => {
        expectPositionsAfterAlignment(ALIGN_H_LEFT, [new Vec2(100, 100), new Vec2(110, 200), new Vec2(130, 300)]);
    });

    it('should align to horizontally center', () => {
        expectPositionsAfterAlignment(ALIGN_H_CENTER, [new Vec2(215, 100), new Vec2(215, 200), new Vec2(215, 300)]);
    });

    it('should align to horizontally right', () => {
        expectPositionsAfterAlignment(ALIGN_H_RIGHT, [new Vec2(330, 100), new Vec2(320, 200), new Vec2(300, 300)]);
    });

    it('should align to vertically top', () => {
        expectPositionsAfterAlignment(ALIGN_V_TOP, [new Vec2(100, 100), new Vec2(200, 110), new Vec2(300, 130)]);
    });

    it('should align to vertically center', () => {
        expectPositionsAfterAlignment(ALIGN_V_CENTER, [new Vec2(100, 215), new Vec2(200, 215), new Vec2(300, 215)]);
    });

    it('should align to vertically bottom', () => {
        expectPositionsAfterAlignment(ALIGN_V_BOTTOM, [new Vec2(100, 330), new Vec2(200, 320), new Vec2(300, 300)]);
    });

    it('should distribute vertically', () => {
        expectPositionsAfterAlignment(DISTRIBUTE_V, [new Vec2(100, 100), new Vec2(200, 185), new Vec2(300, 300)]);
    });

    it('should distribute horizontally', () => {
        expectPositionsAfterAlignment(DISTRIBUTE_H, [new Vec2(100, 100), new Vec2(185, 200), new Vec2(300, 300)]);
    });

    function expectPositionsAfterAlignment(type: string, positions: Vec2[]) {
        const action = alignItems(type, diagram, diagram.items.toArray());
        const state_1 = EditorState.empty().addDiagram(diagram);
        const state_2 = reducer(state_1, action);

        const shapes = state_2.diagrams.last.items.toArray();

        for (let i = 0; i < shapes.length; i++) {
            expect((<DiagramShape>shapes[i]).transform.position).toEqual(positions[i]);
        }
    }
});