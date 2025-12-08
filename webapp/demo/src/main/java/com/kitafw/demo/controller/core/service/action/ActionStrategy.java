package com.kitafw.demo.controller.core.service.action;

public interface ActionStrategy<Input, Output> {
    Output execute(Input input);
}
