package com.kitafw.demo.controller.core.service.action;

public abstract class ActionAbstract<Input, Output> {
    private ActionStrategy<Input, Output> strategy;

    public Output execute(Input input) {
        return strategy.execute(input);
    }
}
