describe("Player", function() {
  it("returns the player's mark", function() {
    var testPlayer1 = new Player("X");
    expect(testPlayer1.mark).to.equal("X");
  });

  it('allows a player to pick a space', function(){
    var testPlayer1 = new Player("X");
    testPlayer1.move(1)
    expect(testPlayer1.spaces).to.eql([1]);
  });

  it('checks if a player has a winning combination', function() {
    var testPlayer1 = new Player("X");
    testPlayer1.move(4);
    testPlayer1.move(5);
    testPlayer1.move(6);
    expect(testPlayer1.win()).to.equal(true);
  });

  it('checks if a player does not have a winning combination', function() {
    var testPlayer1 = new Player("X");
    testPlayer1.move(1);
    testPlayer1.move(5);
    testPlayer1.move(6);
    expect(testPlayer1.win()).to.equal(false);
  });
});

// describe('Space', function(){
//   it('allows a player to pick a space', function(){
//     var space1 = new Space(1, available)
// })
