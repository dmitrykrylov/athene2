import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Col, InputNumber, Row, Select } from 'antd';

import { ColorPicker } from '@app/core';

import {
    changeItemsAppearance,
    ColorConfigurable,
    Configurable,
    Diagram,
    DiagramShape,
    DiagramVisual,
    EditorState,
    getSelection,
    NumberConfigurable,
    SelectionConfigurable,
    SliderConfigurable,
    UndoableState
} from '@app/wireframes/model';

import { CustomSlider } from './custom-slider';

interface CustomPropertiesProps {
    // The selected diagram.
    selectedDiagram: Diagram | null;

    // The selected items.
    selectedShape: DiagramVisual | null;

    // The configurable properties.
    configurables: Configurable[];

    // Change the items appearance..
    changeItemsAppearance: (diagram: Diagram, visuals: DiagramVisual[], key: string, val: any) => any;
}

const mapStateToProps = (state: { editor: UndoableState<EditorState> }) => {
    const { diagram, items } = getSelection(state);

    let selectedShape: DiagramShape | null = null;

    if (items.length === 1) {
        const single = items[0];

        if (single instanceof DiagramShape) {
            selectedShape = single;
        }
    }

    return {
        selectedDiagram: diagram,
        selectedShape,
        configurables: selectedShape ? selectedShape.configurables : []
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators({
    changeItemsAppearance
}, dispatch);

const CustomProperties = (props: CustomPropertiesProps) => {
    return (
        <>
            {props.configurables.map(c =>
                <Row key={c.name} className='property'>
                    <Col span={12} className='property-label'>
                        {c.label}
                    </Col>
                    <Col span={12} className='property-value'>
                        {c instanceof SliderConfigurable &&
                            <CustomSlider value={props.selectedShape!.appearance.get(c.name)}
                                min={c.min}
                                max={c.max}
                                onChange={value => props.changeItemsAppearance(props.selectedDiagram!, [props.selectedShape!], c.name, value)} />
                        }
                        {c instanceof NumberConfigurable &&
                            <InputNumber value={props.selectedShape!.appearance.get(c.name)}
                                min={c.min}
                                max={c.max}
                                onChange={value => props.changeItemsAppearance(props.selectedDiagram!, [props.selectedShape!], c.name, value)} />
                        }
                        {c instanceof SelectionConfigurable &&
                            <Select value={props.selectedShape!.appearance.get(c.name)}
                                onChange={value => props.changeItemsAppearance(props.selectedDiagram!, [props.selectedShape!], c.name, value)}>
                                {c.options.map(o =>
                                    <Select.Option key={o} value={o}>{o}</Select.Option>
                                )}
                            </Select>
                        }
                        {c instanceof ColorConfigurable &&
                            <ColorPicker value={props.selectedShape!.appearance.get(c.name)}
                                onChange={value => props.changeItemsAppearance(props.selectedDiagram!, [props.selectedShape!], c.name, value.toNumber())} />
                        }
                    </Col>
                </Row>
            )}
        </>
    );
};

export const CustomPropertiesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomProperties);