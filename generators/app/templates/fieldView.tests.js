import React from "react";
import TestUtils from 'react-testutils-additions';
import statusCodes from 'reflux-store-status/statusCodes';

import CertificateBuilder from '../../../../testUtilities/builders/certificateBuilder';

import <%= componentNamePC %>View from 'editor/components/fields/<%= componentNameCC %>/<%= componentNameCC %>View.jsx';
import <%= componentNamePC %>Model from 'editor/components/fields/<%= componentNameCC %>/<%= componentNameCC %>Model.ts';

describe('The <%= componentNamePC %> View', () => {
    var component, props, onChange;

    beforeEach(() => {
        var certificate = new CertificateBuilder("1234")
            .build();

        onChange = jasmine.createSpy('onChange');

        props = {
            certificate,
            onChange,
            data: 'SomeAction2',
            <%= componentNameCC %>Data: [
                new <%= componentNamePC %>Model('eVision', 'SomeAction1', new Date(2015, 0, 1)),
                new <%= componentNamePC %>Model('eVision', 'SomeAction2', new Date(2015, 0, 1)),
                new <%= componentNamePC %>Model('eVision', 'SomeAction3', new Date(2015, 0, 1))
            ],
            status: statusCodes.READY,
            options: {
                propertyName: '<%= componentNameCC %>',
                resourceKey: '<%= componentNamePC %>'
            },
            editMode: true
        };
    });

    describe('When the store is not yet loaded', () => {
        beforeEach(() => {
            props.status = statusCodes.PENDING;

            component = TestUtils.renderIntoDocument(<<%= componentNamePC %>View {...props} />);

        });

        it('can be rendered', () => {
            expect(component).toBeDefined();
        });

        it('will show the progress indicator', () => {
            var indicators = TestUtils.find(component, '.progress-indicator');
            expect(indicators.length).toBe(1);
        });
    });


    describe('When the store is loaded', () => {
        beforeEach(() => {
            component = TestUtils.renderIntoDocument(<<%= componentNamePC %>View {...props} />);
        });

        it('can be rendered', () => {
            expect(component).toBeDefined();
        });

        it('will render the dropdown', () => {
            var view = TestUtils.findOne(component, '.form-control');
            expect(React.findDOMNode(view).value).toBe('SomeAction2');
        });

        it('will have 3 items in the dropdown', () => {
            var items = TestUtils.find(component, 'option');
            expect(items.length).toBe(3);
        });

        it('calls the onChange() when the selection is changed', () => {
            var select = TestUtils.findOne(component, 'select');
            TestUtils.Simulate.change(select, {target: {value: 'SomeAction3'}});

            expect(onChange).toHaveBeenCalledWith('<%= componentNameCC %>', 'SomeAction3');
        });
    });

    describe('when not in edit mode', () => {
        beforeEach(() => {
            props.editMode = false;

            component = TestUtils.renderIntoDocument(<<%= componentNamePC %>View {...props} />);
        });

        it('can be rendered', () => {
            expect(component).toBeDefined();
        });

        it('will just render the data', () => {
            var view = TestUtils.findOne(component, '.fieldvalue');
            expect(React.findDOMNode(view).innerText).toBe('SomeAction2');
        });

        it('will not render the dropdown', () => {
            var view = TestUtils.find(component, '.form-control');
            expect(view.length).toBe(0);
        });
    });
});
