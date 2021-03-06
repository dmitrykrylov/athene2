import { Rect2, Vec2 } from '@app/core';

import {
    Configurable,
    DiagramShape,
    SelectionConfigurable,
    TextHeightConstraint
} from '@app/wireframes/model';

import { AbstractContext, AbstractControl } from '@app/wireframes/shapes/utils/abstract-control';
import { CommonTheme } from './_theme';

const STATE_KEY = 'STATE';
const STATE_NORMAL = 'Normal';
const STATE_CHECKED = 'Checked';
const STATE_INTERDEMINATE = 'Interdeminate';
const BOX_SIZE = 18;
const BOX_MARGIN = 4;
const TEXT_POSITION_X = BOX_SIZE + 2 * BOX_MARGIN;

const DEFAULT_APPEARANCE = {};
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_FOREGROUND_COLOR] = CommonTheme.CONTROL_TEXT_COLOR;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_BACKGROUND_COLOR] = CommonTheme.CONTROL_BACKGROUND_COLOR;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_TEXT] = 'Checkbox';
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_TEXT_ALIGNMENT] = 'left';
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_FONT_SIZE] = CommonTheme.CONTROL_FONT_SIZE;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_STROKE_COLOR] = CommonTheme.CONTROL_BORDER_COLOR;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_STROKE_THICKNESS] = CommonTheme.CONTROL_BORDER_THICKNESS;
DEFAULT_APPEARANCE[STATE_KEY] = STATE_NORMAL;

const CONFIGURABLE: Configurable[] = [
    new SelectionConfigurable(STATE_KEY, 'State',
        [
            STATE_NORMAL,
            STATE_CHECKED,
            STATE_INTERDEMINATE
        ])
];

const CONSTRAINT = new TextHeightConstraint(8);

export class Checkbox extends AbstractControl {
    public identifier(): string {
        return 'Checkbox';
    }

    public createDefaultShape(shapeId: string): DiagramShape {
        return DiagramShape.createShape(this.identifier(), 104, 36, CONFIGURABLE, DEFAULT_APPEARANCE, shapeId, CONSTRAINT);
    }

    protected renderInternal(ctx: AbstractContext) {
        this.createBox(ctx);
        this.createText(ctx);
    }

    private createBox(ctx: AbstractContext) {
        const s = BOX_SIZE;
        const x = BOX_MARGIN;
        const y = (ctx.bounds.size.y - s) * 0.5;

        const bounds = new Rect2(new Vec2(x, y), new Vec2(s, s));

        const boxItem = ctx.renderer.createRoundedRectangle(bounds, ctx.shape, 0);

        ctx.renderer.setStrokeColor(boxItem, ctx.shape);
        ctx.renderer.setBackgroundColor(boxItem, ctx.shape);

        ctx.add(boxItem);

        const state = ctx.shape.appearance.get(STATE_KEY);

        if (state === STATE_INTERDEMINATE) {
            const interdeminateBoxItem = ctx.renderer.createRoundedRectangle(bounds.deflate(4, 4), 0, 0);

            ctx.renderer.setBackgroundColor(interdeminateBoxItem, ctx.shape.appearance.get(DiagramShape.APPEARANCE_STROKE_COLOR));

            ctx.add(interdeminateBoxItem);
        } else if (state === STATE_CHECKED) {
            const checkPathItem = ctx.renderer.createPath(`M${bounds.left + 3} ${bounds.centerY + 2} L${bounds.left + bounds.width * 0.4} ${bounds.bottom - 4} L${bounds.right - 3} ${bounds.top + 3}`, 2);

            ctx.renderer.setStrokeStyle(checkPathItem, 'butt', 'butt');
            ctx.renderer.setStrokeColor(checkPathItem, ctx.shape);

            ctx.add(checkPathItem);
        }
    }

    private createText(ctx: AbstractContext) {
        const w = ctx.shape.transform.size.x - TEXT_POSITION_X;
        const h = ctx.shape.transform.size.y;

        const textItem = ctx.renderer.createSinglelineText(new Rect2(new Vec2(TEXT_POSITION_X, 0), new Vec2(w, h)), ctx.shape);

        ctx.add(textItem);
    }
}