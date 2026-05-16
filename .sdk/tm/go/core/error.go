package core

type ShodanEntitydbError struct {
	IsShodanEntitydbError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewShodanEntitydbError(code string, msg string, ctx *Context) *ShodanEntitydbError {
	return &ShodanEntitydbError{
		IsShodanEntitydbError: true,
		Sdk:              "ShodanEntitydb",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ShodanEntitydbError) Error() string {
	return e.Msg
}
