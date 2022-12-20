pragma circom 2.0.0;

template IsZero() {
    signal input in;
    signal output out;

    signal inv;

    inv <-- in!=0 ? 1/in : 0;

    out <== -in*inv +1;
    in*out === 0;
}

template Sample() {
    // private
    signal input a;
    signal input b;
    // private
    signal input c;
    component isAZero = IsZero();
    component isBZero = IsZero();

    isAZero.in <== a - 1;
    isBZero.in <== b - 1;

    isAZero.out === 0;
    isBZero.out === 0;

    c === a*b;

}

component main { public [c] } = Sample();
