// /src/systems/motion/environmental-kernel.ts

import { EnvironmentalState } from './types';

export class EnvironmentalMotionKernel {
    private targetElement: HTMLElement;
    private activeCascadeId: number | null = null;

    constructor(element: HTMLElement) {
        if (!element) throw new Error("EMK requires a valid target environmental membrane.");
        this.targetElement = element;
    }

    /**
     * Propagates a change in the environmental state across the temporal layer stack.
     */
    public propagate(state: EnvironmentalState, intensityMagnitude: number = 1.0): void {
        // Cancel pending cascades to maintain physical momentum
        if (this.activeCascadeId !== null) {
            cancelAnimationFrame(this.activeCascadeId);
        }

        this.activeCascadeId = requestAnimationFrame(() => {
            this.executeCascade(state, intensityMagnitude);
        });
    }

    private executeCascade(state: EnvironmentalState, magnitude: number): void {
        // Phase 1: Immediate UI Compensation (T = 0ms)
        this.applyForce('ui-compensation', state.uiContrast, '0ms');

        // Phase 2: Primary Atmospheric Drift (T = 100ms offset)
        const atmosphericDelay = `${100 * magnitude}ms`;
        this.applyForce('atmospheric-drift', state.luminanceVector, atmosphericDelay);

        // Phase 3: Delayed Reflective Inheritance (T = 400ms offset)
        const reflectiveDelay = `${400 * magnitude}ms`;
        this.applyForce('reflective-bounce', state.specularInheritance, reflectiveDelay);

        // Phase 4: Shadow Pressure Settlement & Thermal Retention (T = 800ms offset)
        const shadowDelay = `${800 * magnitude}ms`;
        this.applyForce('shadow-pressure', state.cornerOcclusion, shadowDelay);
    }

    private applyForce(layerName: string, value: string, delay: string): void {
        // Inject the staggering delay dynamically
        this.targetElement.style.setProperty(`--emk-delay-${layerName}`, delay);
        // Set the target data state for CSS to react to
        this.targetElement.setAttribute(`data-state-${layerName}`, value);
    }
}